import { Typography } from "components/atoms/Typography"
import { NavBar } from "components/organisms/NavBar"
import { ChangeEvent, useEffect, useState } from "react"
import { Collectioncard } from "components/molecules/Card/Collectioncard"
import { Button } from "components/atoms/Button"
import { Modal } from "components/molecules/Modal"
import { Input } from "components/atoms/Input/input"
import { CloseIcon } from "components/atoms/Icons/CloseIcon"
import { useNavigate } from "react-router-dom"
import { useAddFlashCardCategoryMutation, useGetFlashCardSetsQuery } from "services/flashCardApi"
import { useGetLimitQuery, useUpdateLimitMutation } from "services/settingApi"
import { category } from "utils/types"
import { TextArea } from "components/atoms/TextArea/input"
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FlashError } from "components/molecules/Error"
import { ReviewComponent } from "components/molecules/Review"
import { getToken } from "utils/functions"
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "utils/interfaces"
import "./index.scss"

export const Home = () => {
    const navigate = useNavigate();
    const [searchvalue, setSearchValue] = useState("")
    const [flashCardCollectionName, setFlashCardCollectionName] = useState("")
    const [flashCardCollectionDescription, setFlashCardCollectionDescription] = useState("")
    const [collectionNameError, setCollectionNameError] = useState("")
    const [collectionDescriptionError, setCollectionDescriptionError] = useState("")
    const [isFlashCardCollectionAddModalOpen, setIsFlashCardCollectionAddModalOpen] = useState(false)
    const [isLimitChangeModalOpen, setIsLimitChangeModalOpen] = useState(false)
    const [currentLimit, setCurrentLimit] = useState(0)
    const { data, isLoading, isError, refetch, error } = useGetFlashCardSetsQuery();
    const { data: limitData, isLoading: limitDataIsLoading, isError: limitDataIsError, refetch: limitDataRefetch } = useGetLimitQuery();
    const [addFlashCardCategory, { isLoading: addFlashCardCategoryisLoading, isError: addFlashCardCategoryisError, isSuccess: addFlashCardCategoryisSuccess }] = useAddFlashCardCategoryMutation();
    const [categoryLimit, { isLoading: addLimitLoading, isError: addLimitIsError }] = useUpdateLimitMutation();


    const handleFlashCardPageRederection = (collectionId: string) => {
        navigate(`collection/${collectionId}`)
    }


    const handleFlashCardCollectionTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFlashCardCollectionName(e.target.value)
    }

    const handleFlashCardCollectionDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFlashCardCollectionDescription(e.target.value)
    }

    const handleClear = () => {
        setFlashCardCollectionName(prev => "")
        setFlashCardCollectionDescription(prev => "")
    }

    const handleModalClose = () => {
        setIsFlashCardCollectionAddModalOpen(prev => !prev)
    }

    const handleAddFlashCardCategory = async () => {

        if (!flashCardCollectionName) {
            setCollectionNameError("Name Field is Required")
        }

        if (!flashCardCollectionDescription) {
            setCollectionNameError("Description Field is Required")
        }

        if (flashCardCollectionName && flashCardCollectionDescription) {
            const payload = {
                name: flashCardCollectionName,
                description: flashCardCollectionDescription,
            };

            try {
                const response = await addFlashCardCategory(payload).unwrap();
                console.log("Flashcard added successfully:", response);
                refetch()
                handleModalClose()
                toast.success("Collection Created successfully!", {
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
                setFlashCardCollectionName(prev => "")
                setFlashCardCollectionDescription(prev => "")
            } catch (error) {
                console.error("Error adding flashcard:", error);
                toast.error('Something went wrong', {
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

    };

    const handleLimitChangeModalOpen = () => {
        setIsLimitChangeModalOpen(prev => !prev)
    }

    const changeCollectionLimit = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentLimit(Number(e.target.value))
    }

    const handleLimitClear = () => {
        setCurrentLimit(limitData?.daily_limit)
    }

    const submitNewLimit = async () => {
        const payload = {
            limit: currentLimit,
        };
        try {
            const response = await categoryLimit(payload).unwrap();
            console.log("Limit updated successfully:", response);
            limitDataRefetch()
            handleLimitChangeModalOpen()
            toast.success("Limit updated successfully!", {
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
        } catch (error) {
            console.error("Error Limit update:", error);
            toast.error('Something went wrong', {
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

    const isAdmin = (): boolean => {
        let token = getToken();
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            if (decoded.role == 1) {
                return true;
            } else {
                return false;
            }
        }
        return false
    }

    useEffect(() => {
        if (error && 'status' in error) {

            switch (error.status) {
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
    }, [error])

    useEffect(() => {
        if (limitData) {
            setCurrentLimit(limitData.daily_limit)
        }
        isAdmin()
    }, [limitData])

    return (
        <div className="home-page-wrapper">
            <NavBar searchValue={searchvalue} setSearchValue={setSearchValue} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition:Bounce
            />


            {getToken() ? <div className="content-wrapper">
                <div className="collection-text-btn-wrapper">
                    <div className="collection-text-wrapper">
                        <Typography label="Flash Card Collections" variant="h2" className="collection-text-style" />
                        <Typography label={data?.length} variant="h2" className="collection-count-text-style" />
                    </div>
                    <div className="collection-btn-wrapper">
                        <Button label="Add Collection" type="warning" onClick={handleModalClose} />
                        {isAdmin() ? <Button label="Change Collection Limit" type="dark" onClick={handleModalClose} /> : null}
                    </div>

                </div>

                <div className="collections-card-container">

                    {data?.map((item: category, index: number) => (

                        <Collectioncard item={item} onClick={() => handleFlashCardPageRederection(item.id)} />

                    ))}
                </div>
            </div> : <div className="login-content-wrapper">
                <Typography label="You need to Loging first" variant="h3" className="need-loging-text" />
            </div>}

            <Modal isOpen={isFlashCardCollectionAddModalOpen} onClose={handleModalClose}>
                <div className="flash-card-modal-wrapper">
                    <div className="top-wrapper">
                        <CloseIcon
                            className="close-icon-styles"
                            onClick={handleModalClose}
                        />
                    </div>
                    <Input placeHolder="Collection Name" onChange={handleFlashCardCollectionTitleChange} value={flashCardCollectionName} className="add-flash-card-input-style" />
                    {collectionNameError ? <FlashError label={collectionNameError} /> : null}
                    <TextArea placeHolder="Collection Description" onChange={handleFlashCardCollectionDescriptionChange} value={flashCardCollectionDescription} className="add-flash-card-input-style" />
                    {collectionDescriptionError ? <FlashError label={collectionDescriptionError} /> : null}
                    <div className="Button-wrapper">
                        <Button onClick={handleClear} label="Clear" type="danger" />
                        <Button onClick={handleAddFlashCardCategory} label="Submit" type="success" isDisable={!flashCardCollectionName || !flashCardCollectionDescription} />
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isLimitChangeModalOpen} onClose={handleLimitChangeModalOpen}>
                <div className="flash-card-modal-wrapper">
                    <div className="top-wrapper">
                        <CloseIcon
                            className="close-icon-styles"
                            onClick={handleLimitChangeModalOpen}
                        />
                    </div>
                    <Input placeHolder="Collection Limit" onChange={changeCollectionLimit} type="number" value={currentLimit} className="add-flash-card-input-style" />
                    {collectionNameError ? <FlashError label={collectionNameError} /> : null}
                    <div className="Button-wrapper">
                        <Button onClick={handleLimitClear} label="Clear" type="danger" />
                        <Button onClick={submitNewLimit} label="Submit" type="success" isDisable={limitData?.daily_limit == currentLimit || currentLimit == 0} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}