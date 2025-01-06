import React, { useEffect, useRef } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { useAuth } from "@/auth/AuthProvider";
import Header2 from "@/components/typography/Header2";
import { getBlinkFromUserId } from "@/api/blinks/getBlinkFromUserId";
import HistoryElement from "./historyElement";

const HistoryFrame: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const [loading, setLoading] = React.useState(true);
  const [history, setHistory] = React.useState<any>(null);
  const [recordStartTimes, setRecordStartTimes] = React.useState<string[]>([]);

  const fetchHistory = async () => {
    const res = await getBlinkFromUserId(user.id);

    const startTimes = Object.keys(res);

    setRecordStartTimes(
      startTimes.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    );

    setHistory(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div
      style={{
        flex: 2,
      }}
    >
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
        <HistoryIcon
          style={{
            verticalAlign: "middle",
            marginRight: "8px",
          }}
        />
        <Header2
          text="HISTORY"
          style={{
            marginTop: "0px",
            marginBottom: "0px",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#262335",
          borderRadius: "25px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          objectFit: "cover",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Header2 text="Loading..." />
          </div>
        ) : recordStartTimes.length > 0 ? (
          <>
            {recordStartTimes.map((startTime: string, index: number) => (
              <React.Fragment key={startTime.toString()}>
                <HistoryElement
                  user={user}
                  time={new Date(startTime)}
                  counts={history[startTime]}
                />
                {index < recordStartTimes.length - 1 && (
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          <div
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              textAlign: "center",
              flexDirection: "column",
              color: "rgba(255, 255, 255, 0.3)",
              fontWeight: "bold",
            }}
          >
            <HistoryIcon
              style={{
                fontSize: "70px",
                color: "rgba(255, 255, 255, 0.3)",
              }}
            />
            Never tracked you eyes?
            <br /> Start tracking now!
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryFrame;
