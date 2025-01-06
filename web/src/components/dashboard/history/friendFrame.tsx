import Header2 from '@/components/typography/Header2';
import React, { useEffect, useRef, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { getUserFriends } from '@/api/user/getUserFriends';
import { useAuth } from '@/auth/AuthProvider';
import { useSession } from 'next-auth/react';
import { getFriendInvite } from '@/api/friend/getFriendInvite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const FriendFrame: React.FC = () => {
  const { user } = useAuth();
  const { data: session } = useSession();

  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendsData, setFriendsData] = useState<any[]>([]);

  const [invitesLoading, setInvitesLoading] = useState(true);
  const [inviteData, setInviteData] = useState<any[]>([]);

  const fetchFriends = async () => {
    if (!user) return;
    const res = await getUserFriends(user.id);
    if (!res.success) return;
    setFriendsData(res.friends ?? []);
    setFriendsLoading(false);
  }

  const fetchInvites = async () => {
    if (!session) return;
    const res = await getFriendInvite(session);

    setInviteData(res);
    setInvitesLoading(false);
  }

  useEffect(() => {
    fetchFriends();
    fetchInvites();
  }, [])

  return (
    <div style={{
      flex: 1,
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: "10px",
        marginBottom: "15px"
      }}>
        <PersonIcon style={{
          verticalAlign: "middle",
          marginRight: "8px",
        }} />
        <Header2 text="FRIENDS" style={{
          marginTop: "0px", 
          marginBottom: "0px",
        }}/>
      </div>

      <div style={{
        backgroundColor: "#262335",
        borderRadius: "25px",
        objectFit: "cover",
      }}>
        {friendsLoading ? (
          <div>Loading... </div>
        ) : (
          friendsData.length !== 0 ? (
            friendsData.map((friend) => (
              <div key={friend.id} style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: "10px",
                marginBottom: "15px"
              }}>
                <img src={friend.profilePicture} alt="Profile" style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "10px"
                }} />
                <span>{friend.nickname}</span>
              </div>
            ))
          ) : (
            <div style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "rgba(255, 255, 255, 0.3)",
              fontWeight: "bold",
            }}>
              <PersonAddIcon style={{
                fontSize: "70px",
                color: "rgba(255, 255, 255, 0.3)",
              }} />
              Make new friends!
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FriendFrame;