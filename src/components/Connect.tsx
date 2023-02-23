import { CustomButton } from "./Button";

interface IConnect {
    connect: () => void
}

export default function Connect({ connect }: IConnect) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%"
            }}
            className="d-flex justify-content-center align-items-center"
        >
            <div className="container" style={{ height: "60%" }}>
                <div className="row m-0" style={{ height: "100%" }}>
                    <div className="col-lg d-flex align-items-center justify-content-center">
                        <div>
                            <CustomButton onClick={connect}>Connect Your Wallet {">"}</CustomButton>
                            <p className="mt-4">Maske sure that you have install MateMask on your Google Chrome Extensions. If not, <a href="https://metamask.io/download" target="_blank">install here</a>.</p>
                        </div>
                    </div>
                    <div className="col-lg d-flex justify-content-center align-items-center">
                        <img src="https://cdn.dribbble.com/users/2574702/screenshots/6702374/metamask.gif" height="500px" />                    
                    </div>

                </div>
            </div>
        </div>
    )
}