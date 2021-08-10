import React from 'react';
import { FC } from 'react';

interface Props {
    handleSelect: (event: any) => void
    role: string
    logOut: () => void
}

export const HeaderMenu: FC<Props> = ({ handleSelect, role, logOut }) => {

    switch (role) {
        case "User":
            return (
                <ul>
                    <li><a className="active" id={"1"} onClick={logOut} href="#Create Page">Log Out</a></li>
                </ul>
            )
        case "Admin":
            return (
                <ul>
                    <li><a className="active" id={"1"} onClick={logOut} href="#Create Page">Hello Admin</a></li>
                </ul>
            )
        default:
            return (
                <ul>
                    <li><a className="active" id={"1"} onClick={handleSelect} href="#Create Page">Sign In</a></li>
                </ul>
            )
    }

}

