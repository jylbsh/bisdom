import styled from "styled-components";
import x1 from "../../assets/image/icon.png";
import x2 from "../../assets/image/search-lens.png";
import { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import * as HoverCard from "@radix-ui/react-hover-card";
import { StyledButton } from "../Login/Login";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const ContextMenu = styled.div`
${(props) => (props.isToggled && "display:none")}
`
const ContextMenuItem = styled.div`
display:grid;
flex-direction:column;
height:10rem;
width:20rem;
img{
width:10rem;
height:10rem;
border-radius:10rem;}
`;
const ContextMenuItemIcon = styled.img`
background-color:blue;`;
const ContextMenuItemDetail = styled.div`
width:10rem;
background-color:red`;
const Wrapper = styled.div`
img{
width:50px;
height:50px;
z-index:100000;}`;
const IconUrl = [x2, x2, x2]
const DetailContents = ["適当", "適当", "適当"]

const UserAvatar = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return <HoverCard.Root>
		<HoverCard.Trigger asChild>
			<a
				className="ImageTrigger"
				href="https://chatgpt.com/"
				target="_blank"
				rel="noreferrer noopener"
			>
				<Avatar.Root className="AvatarRoot">
			<Avatar.Image
				className="AvatarImage"
                src={x1}
                width={50}
                height={50}
                style={{borderRadius:"99%",marginTop:"1vh"}}
                alt="userIcon"
			/>
			<Avatar.Fallback className="AvatarFallback" delayMs={600}>
				JY
			</Avatar.Fallback>
		</Avatar.Root>
			</a>
		</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content className="HoverCardContent" sideOffset={5} style={{background:"#9f9f9f88",height:400,width:220}}>
				<div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <StyledButton onClick={handleLogout}>ログアウト</StyledButton>
					<div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
						<div>
							<div className="Text bold"><StyledButton onClick={handleLogout}>ログアウト</StyledButton></div>
							<div className="Text faded"><StyledButton onClick={handleLogout}>ログアウト</StyledButton></div>
						</div>
						<div className="Text">
                        <StyledButton onClick={handleLogout}>ログアウト</StyledButton>						</div>
						<div style={{ display: "flex", gap: 15 }}>
							<div style={{ display: "flex", gap: 5 }}>
								<div className="Text bold"><StyledButton onClick={handleLogout}>ログアウト</StyledButton></div>{" "}
							</div>
							
						</div>
					</div>
				</div>

				<HoverCard.Arrow className="HoverCardArrow" />
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
    /*return (<Wrapper>
        
        
        <ContextMenu isToggled={isToggled}>
            {IconUrl.forEach((v, i) => {
                return <ContextMenuItem><ContextMenuItemIcon src={v} /><ContextMenuItemDetail>{DetailContents[i]}</ContextMenuItemDetail></ContextMenuItem>
            })}
        </ContextMenu></Wrapper>)
*/}
export default UserAvatar;