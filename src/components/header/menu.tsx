import React from 'react';
import { FC } from 'react';

interface Props {
    handleSelect: (event: any) => void
    role: string
    logOut: () => void
}

export const HeaderMenu: FC<Props> = ({ handleSelect, role, logOut }) => {

    const goToPage = (path: string) => {
        window.location.href = path
    }

    switch (role) {
        case "User":
            return (
                <ul className="header-menu">
                    <li className="header-menu-item"><a className="active" id={"1"} onClick={logOut} href="#Create Page">Log Out</a></li>
                </ul>
            )
        case "Admin":
            return (
                <ul className="header-menu">
                    <li className="header-menu-item"><a className="active" id={"1"} onClick={()=>goToPage("/content")} href="#Create Page">Content</a></li>
                    <li className="header-menu-item"><a className="active" id={"1"} onClick={logOut} href="#Create Page">Log Out</a></li>
                </ul>
            )
        default:
            return (
                <ul className="header-menu">
                    <li className="header-menu-item"><a className="active" id={"1"} onClick={handleSelect} href="#Create Page">Sign In</a></li>
                </ul>
            )
    }

}

