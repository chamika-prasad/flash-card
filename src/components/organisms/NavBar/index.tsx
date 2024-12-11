import { Button } from "components/atoms/Button"
import { Input } from "components/atoms/Input/input"
import { Typography } from "components/atoms/Typography"
import { ChangeEvent, useEffect, useState } from "react"
import { INavBarProps } from "utils/interfaces"
import searchIcon from "assets/magnifier.png";
import "./index.scss"
import classNames from "classnames"
import { Modal } from "components/molecules/Modal"
import { CloseIcon } from "components/atoms/Icons/CloseIcon"
import { Bounce, toast } from "react-toastify"
import { useLoginMutation, useRegisterMutation } from "services/userApi"
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetFlashCardSetsQuery } from "services/flashCardApi"

export const NavBar = ({ searchValue, setSearchValue }: INavBarProps) => {

    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [action, setAction] = useState<null | "login" | "signup">(null);
    const [email, setEmail] = useState<string>("");
    const [pasword, setPassword] = useState<string>("");
    const [addUser, { isLoading: addUserisLoading, isError: addUserisError, isSuccess: addUserisSuccess, error: addUserError }] = useRegisterMutation();
    const [loginUser, { isLoading: loginUserisLoading, isError: loginUserisError, isSuccess: loginUserisSuccess, error: loginUserError }] = useLoginMutation();
    const { data, isLoading, isError, refetch, error } = useGetFlashCardSetsQuery();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        setAction("login")
        setIsModelOpen(true)
    }

    const handleSignUp = () => {
        setAction("signup")
        setIsModelOpen(true)
    }

    const searchInputOnFocus = () => {
        setIsSearchFocus(true);
    }

    const searchInputonBlur = () => {
        setIsSearchFocus(false);
    }

    const handleModalClose = () => {
        setIsModelOpen(prev => !prev)
    }

    const handleInputsClear = () => {
        setEmail("")
        setPassword("")
    }

    const handleSubmit = async () => {
        if (action === "signup") {
            try {
                const payload = {
                    email: email,
                    password: pasword,
                };
                const response = await addUser(payload).unwrap();
                toast.success("User Created Successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setAction("login")
            } catch (error) {
                console.error("Error Registering:", error);
            }
        }
        if (action === "login") {
            try {
                const payload = {
                    email: email,
                    password: pasword,
                };
                const response = await loginUser(payload).unwrap();
                localStorage.removeItem("token");
                localStorage.setItem("token", response?.data);

                toast.success("User login Successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setAction(null)
                refetch()
                handleModalClose()
            } catch (error) {
                console.error("Error Registering:", error);
            }
        }
        setEmail("")
        setPassword("")
    }

    const handleOpositeAction = (opositeAction: "login" | "signup") => {
        setAction(opositeAction)
    }

    // Helper function to extract error message
    const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
        if (!error) return 'An unexpected error occurred';

        if ('status' in error) {
            // Handle FetchBaseQueryError (API errors)
            const apiError = error as FetchBaseQueryError;
            if (apiError.data && typeof apiError.data === 'object') {
                return (apiError.data as any).data || 'Bad Request';
            }
        } else if ('message' in error) {
            // Handle SerializedError (internal errors)
            return error.message || 'An unexpected error occurred';
        }

        return 'An unexpected error occurred';
    };



    useEffect(() => {
        if (addUserError && 'status' in addUserError) {

            switch (addUserError.status) {
                case 400:
                    toast.error(getErrorMessage(addUserError), {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    break;
                case 401:
                    toast.error('Unauthorized user.Sign in again', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    break;
                case 403:
                    // code block
                    toast.error('Please Sign in First', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });

                    break;

                case 500:
                    toast.error('Internal Server Error', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    break;
                default:
                    toast.error('Something went wrong. Please Try again', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
            }

        }
    }, [addUserError])

    useEffect(() => {
        if (loginUserError && 'status' in loginUserError) {
            console.log(loginUserError);

            switch (loginUserError.status) {
                case 400:
                    toast.error(getErrorMessage(loginUserError), {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    break;
                case 401:
                    toast.error('Unauthorized user.Sign in again', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    break;
                case 403:
                    // code block
                    toast.error('Please Sign in First', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });

                    break;

                case 500:
                    toast.error('Internal Server Error', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    break;
                default:
                    toast.error('Something went wrong. Please Try again', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
            }

        }
    }, [loginUserError])

    return (
        <div className="nav-bar-wrapper">
            <Typography variant="h2" label="Flash Card App" />
            <div className={classNames("search-input-wrapper", isSearchFocus ? "search-input-focus" : "")}>
                <img src={searchIcon} alt="search" />
                <Input value={searchValue} placeHolder="Search.." onChange={handleInputChange} className="nav-search-input-custom-style" onFocus={searchInputOnFocus} onBlur={searchInputonBlur} /></div>
            <div className="button-group-wrapper">
                <Button label="Login" onClick={handleLogin} type="default" />
                <Button label="Sign Up" onClick={handleSignUp} type="primary" />
            </div>

            <Modal isOpen={isModelOpen} onClose={handleModalClose}>
                <div className="user-form-modal-wrapper">
                    <div className="user-action-top-wrapper">
                        <Typography variant="h4" label={action === "login" ? "Login Form" : "Register Form"} />
                        <CloseIcon
                            className="user-action-close-icon-styles"
                            onClick={handleModalClose}
                        />
                    </div>
                    <Input placeHolder="Email" onChange={handleEmailInputChange} value={email} className="user-modal-input-style" />
                    <Input placeHolder="Password" onChange={handlePasswordInputChange} value={pasword} className="user-modal-input-style" />
                    <div className="user-action-Button-wrapper">
                        <Button onClick={handleInputsClear} label="Clear" type="danger" isLoading={false} className="btn-custm-style" />
                        <Button onClick={handleSubmit} label="Submit" type="success" isDisable={!email || !pasword} className="btn-custm-style" />
                    </div>

                    {
                        action === "login" ? <div className="other-action-wrapper"><Typography label="Don't have an account ?" variant="p" />
                            <p className="action" onClick={() => handleOpositeAction("signup")}>Register</p></div>
                            :
                            <div className="other-action-wrapper"><Typography label="Already have an account ?" variant="p" />
                                <p className="action" onClick={() => handleOpositeAction("login")}>Sign in</p></div>
                    }
                </div>
            </Modal>
        </div>
    )
}