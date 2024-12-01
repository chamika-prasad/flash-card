import { Button } from "components/atoms/Button"
import { Input } from "components/atoms/Input/input"
import { Typography } from "components/atoms/Typography"
import { ChangeEvent, useState } from "react"
import { INavBarProps } from "utils/interfaces"
import searchIcon from "assets/magnifier.png";
import "./index.scss"
import classNames from "classnames"

export const NavBar = ({ searchValue, setSearchValue }: INavBarProps) => {

    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleLogin = () => {
        console.log("login");
    }

    const handleSignUp = () => {
        console.log("register");
    }

    const searchInputOnFocus = () => {
        setIsSearchFocus(true);
    }

    const searchInputonBlur = () => {
        setIsSearchFocus(false);
    }

    return (
        <div className="nav-bar-wrapper">
            <Typography variant="h2" label="Flash Card App" />
            <div className={classNames("search-input-wrapper",isSearchFocus?"search-input-focus":"")}>
                <img src={searchIcon} alt="search" />
                <Input value={searchValue} placeHolder="Search.." onChange={handleInputChange} className="nav-search-input-custom-style" onFocus={searchInputOnFocus} onBlur={searchInputonBlur} /></div>
            <div className="button-group-wrapper">
                <Button label="Login" onClick={handleLogin} type="default"/>
                <Button label="Sign Up" onClick={handleSignUp} type="primary"/>
            </div>
        </div>
    )
}