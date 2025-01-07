import Header2 from "@/components/typography/Header2";
import React, { useEffect, useRef, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { getUserFriends } from "@/api/user/getUserFriends";
import { useAuth } from "@/auth/AuthProvider";
import { useSession } from "next-auth/react";
import { getFriendInvite } from "@/api/friend/getFriendInvite";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { themeColor } from "@/constants/colors";
import { Friend } from "@/app/dashboard/page";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SelectedFriendFrame from "../dialog/selectedFriend";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';



interface TabButtonProps {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  onTabClick: (name: string) => void;
 }


 const TabButton: React.FC<TabButtonProps> = ({ name, icon, active, onTabClick }) => (
  <button
    onClick={() => onTabClick(name.toLowerCase())}
    style={{
      padding: "8px 16px",
      backgroundColor: active ? "#3D3D3D" : "transparent",
      border: "none",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
    }}
  >
    {icon}
    {name}
  </button>
 );
 
 const FriendFrame: React.FC = () => {
  const { user } = useAuth();   
  const { data: session } = useSession();   
  const [activeTab, setActiveTab] = useState("friends");    
  const [friendsLoading, setFriendsLoading] = useState(false);   
   
   const [invitesLoading, setInvitesLoading] = useState(true);   
   const [inviteData, setInviteData] = useState<any[]>([]);    
   const [searchQuery, setSearchQuery] = useState("");   
   const [showFriends, setShowFriends] = useState(false);   
   const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
   const [position, setPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

   const [friendsData, setFriendsData] = useState<Friend[]>([
    {
      id: "1", 
      nickname: "Sarah",
      email: "sarah@example.com",
      isOnline: true,
      lastSession: {
        start: new Date(Date.now() - 3600000),
      },
    },
    {
      id: "2",
      nickname: "Mike", 
      email: "mike@example.com",
      isOnline: false,
      lastSession: {
        start: new Date(Date.now() - 7200000),
        end: new Date(Date.now() - 3600000),
      },
    },
    {
      id: "3",
      nickname: "John",
      email: "john@example.com", 
      isOnline: true,
      lastSession: {
        start: new Date(Date.now() - 1800000),
      },
    }
   ]);
  // Add near your other state declarations
const [requestsData, setRequestsData] = useState([
  {
    id: "1",
    nickname: "Sarah",
    email: "sarah@example.com",
    isOnline: true
  },
  {
    id: "2",
    nickname: "Mike",
    email: "mike@example.com",
    isOnline: false
  },
  {
    id: "3",
    nickname: "John",
    email: "john@example.com",
    isOnline: true
  }
]);

// Add these functions to your component
const handleAcceptRequest = (id: string) => {
  // Add your accept logic here
  console.log('Accepted request:', id);
};

const handleRejectRequest = (id: string) => {
  // Add your reject logic here
  console.log('Rejected request:', id);
};
{/* Search State */}

const filteredFriends = friendsData.filter((friend)=> 
  friend.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  friend.email.toLowerCase().includes(searchQuery.toLowerCase())
);
 
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: "10px",
          marginBottom: "15px",
        }}
      >
        <PersonIcon
          style={{
            verticalAlign: "middle",
            marginRight: "8px",
          }}
        />
        <Header2
          text="FRIENDS"
          style={{
            marginTop: "0px",
            marginBottom: "0px",
          }}
        />
      </div>
 
      <div style={{ flex: 1 }}>
        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "0px",
          padding: "10px",
        }}>
          <TabButton 
            name="Friends" 
            icon={<PersonIcon />} 
            active={activeTab === "friends"} 
            onTabClick={setActiveTab}
          />
          <TabButton 
            name="Add" 
            icon={<PersonAddIcon />} 
            active={activeTab === "add"} 
            onTabClick={setActiveTab}
          />
          <TabButton 
            name="Requests" 
            icon={<NotificationsIcon />} 
            active={activeTab === "requests"} 
            onTabClick={setActiveTab}
          />
        </div>
 
        <div style={{
          backgroundColor: "#262335",
          borderRadius: "25px",
          padding: "20px",
          height: "300px",
        }}>
          {friendsLoading ? (
            <div>Loading... </div>
          ) : (
            <>
              {activeTab === "friends" && (
                <>
                  <div style={{
                    position: "relative",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <input
                      type="text"
                      placeholder="Search friends..."
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: themeColor.primary,
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "14px",
                        outline: "none",
                      }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div style={{
                      position: "absolute",
                      right: "12px",
                      zIndex: 1,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#999",
                    }}>
                      🔍
                    </div>
                  </div>
                  
                
                  <div style={{
                    marginTop: "10px",
                    borderTop: "1px solid #444",
                    paddingTop: "10px",
                  }}>
                    {filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setPosition({
                            top: rect.bottom + 100, // 선택한 항목 아래 10px 간격
                            left: rect.left +10
                          });
                          setSelectedFriend(friend);
                        }}
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: "#4D4766",
                          marginBottom: "10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "#8E85B3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {friend.nickname[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                            {friend.nickname}
                          </div>
                          <div style={{ fontSize: "12px", color: "#aaa" }}>
                            {friend.email}
                          </div>
                        </div>
                      </div>
                      
                    ))}
                    {/* SelectedFriendFrame 표시 */}
                  {selectedFriend && (
                    <SelectedFriendFrame
                      selectedFriend={selectedFriend}
                      setSelectedFriend={setSelectedFriend} // 닫기 버튼에서 상태 초기화
                      position={position}
                    />
                  )}
                  </div>
                </>
              )}
              {activeTab === "add" && (
            <div style={{ color: "white", padding: "0px", textAlign: "center" }}>
              <div style={{
                position: "relative",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <input
                  type="text"
                  placeholder="Search friends..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: "#302C42", // Adjust to match your theme
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div style={{
                  position: "absolute",
                  right: "12px",
                  zIndex: 1,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                }}>
                  🔍
                </div>
              </div>
              
              {/* Add new friends content goes here */}
            </div>
            )}

            {activeTab === "requests" && (
                <div style={{ color: "white", paddingTop: "3px", textAlign: "center" }}>
                 {requestsData.map((request) => (
        <div
          key={request.id}
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#4D4766",
            marginBottom: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between"  // This will push the buttons to the right
          }}
        >
          <div style={{
            display: "flex",
            
            gap: "10px",
            flex: 1
          }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#8E85B3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {request.nickname[0]}
            </div>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "4px", display: "flex", alignItems: "flex-start" }}>
                {request.nickname}
              </div>
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                {request.email}
              </div>
            </div>
          </div>

          {/* Accept/Reject Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleAcceptRequest(request.id)}
              style={{
                padding: "5px 7px",
                backgroundColor: "#8176AF",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
               <CheckIcon fontSize="small" />

            </button>
            <button
              onClick={() => handleRejectRequest(request.id)}
              style={{
                padding: "5px 7px",
                backgroundColor: "#E86452",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
           <CloseIcon fontSize="small" />
         </button>
       </div>
     </div>
   ))}
    
  </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
 };
 
export default FriendFrame;
