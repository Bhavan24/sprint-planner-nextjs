import { JaaSMeeting } from '@jitsi/react-sdk';

const MeetComponent = () => {
    const YOUR_APP_ID = `${process.env.NEXT_PUBLIC_JITSI_APP_ID}`;
    const ROOM_NAME = `kaya-sprint-planner-${Date.now()}`;

    const handleJitsiIFrameRef1 = (iframeRef: any) => {
        iframeRef.style.border = '2em solid #FFFFFF';
        iframeRef.style.background = '#FFFFFF';
        iframeRef.style.height = '100vh';
    };

    return (
        <>
            <JaaSMeeting
                getIFrameRef={handleJitsiIFrameRef1}
                appId={YOUR_APP_ID}
                roomName={ROOM_NAME}
            />
        </>
    );
};

export default MeetComponent;
