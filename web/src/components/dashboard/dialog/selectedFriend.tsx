import React, { useState, useEffect } from 'react';
import { ChevronDown, Power } from 'lucide-react';
import { Friend } from "@/app/dashboard/page";

interface FriendListProps {
  filteredFriends: Friend[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const getElapsedTime = (startTime: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - startTime.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`;
  } else {
    return `${diffMins}m`;
  }
};

const getSessionDuration = (session: { start: Date; end?: Date }): string => {
  const startTime = new Date(session.start);
  const endTime = session.end ? new Date(session.end) : new Date();

  const diffMs = endTime.getTime() - startTime.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`;
  } else {
    return `${diffMins}m`;
  }
};

const ExpandableFriendList: React.FC<FriendListProps> = ({ 
  filteredFriends,
  searchQuery,
  setSearchQuery
}) => {
  const [expandedFriendId, setExpandedFriendId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full p-3 pl-4 pr-10 bg-purple-900 rounded-xl text-white text-sm outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="w-full">
            {/* Friend Card */}
            <div
              onClick={() => setExpandedFriendId(expandedFriendId === friend.id ? null : friend.id)}
              className="rounded-2xl bg-purple-900 cursor-pointer overflow-hidden"
            >
              {/* Friend Basic Info */}
              <div className="p-4 flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white text-xl">
                  {friend.nickname[0]}
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <div className="text-white text-lg font-semibold">
                    {friend.nickname}
                  </div>
                  <div className="text-purple-300">
                    {friend.email}
                  </div>
                </div>

                {/* Online Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                  <ChevronDown 
                    className={`w-5 h-5 text-purple-300 transition-transform duration-300 ${
                      expandedFriendId === friend.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedFriendId === friend.id ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="p-4 bg-purple-950">
                  {friend.lastSession && (
                    <div className="space-y-4">
                      {/* Status Section */}
                      <div className="flex items-center justify-center gap-2">
                        <Power className={`w-5 h-5 ${friend.isOnline ? 'text-green-500' : 'text-gray-500'}`} />
                        <span className={`text-lg font-medium ${friend.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                          {friend.isOnline ? 'Currently Online' : 'Offline'}
                        </span>
                      </div>

                      {/* Time Info */}
                      <div className="flex justify-between px-4">
                        <div>
                          <div className="text-purple-300 mb-1">Started</div>
                          <div className="text-white text-lg">
                            {friend.lastSession.start.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-purple-300 mb-1">Duration</div>
                          <div className="text-white text-lg">
                            {friend.isOnline 
                              ? getElapsedTime(friend.lastSession.start)
                              : getSessionDuration(friend.lastSession)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandableFriendList;