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
import { category } from "utils/types"
import { TextArea } from "components/atoms/TextArea/input"
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./index.scss"
import { FlashError } from "components/molecules/Error"
import { ReviewComponent } from "components/molecules/Review"

export const Home = () => {
    const navigate = useNavigate();
    const [searchvalue, setSearchValue] = useState("")
    const [flashCardCollectionName, setFlashCardCollectionName] = useState("")
    const [flashCardCollectionDescription, setFlashCardCollectionDescription] = useState("")
    const [collectionNameError, setCollectionNameError] = useState("")
    const [collectionDescriptionError, setCollectionDescriptionError] = useState("")
    const [isFlashCardCollectionAddModalOpen, setIsFlashCardCollectionAddModalOpen] = useState(false)
    const { data, isLoading, isError, refetch } = useGetFlashCardSetsQuery();
    const [addFlashCardCategory, { isLoading: addFlashCardCategoryisLoading, isError: addFlashCardCategoryisError, isSuccess: addFlashCardCategoryisSuccess }] = useAddFlashCardCategoryMutation();


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

           
            <div className="content-wrapper">
                <div className="collection-text-btn-wrapper">
                    <div className="collection-text-wrapper">
                        <Typography label="Flash Card Collections" variant="h2" className="collection-text-style" />
                        <Typography label="30" variant="h2" className="collection-count-text-style" />
                    </div>
                    <Button label="Add Collection" type="warning" onClick={handleModalClose} />
                </div>

                <div className="collections-card-container">

                    {data?.map((item: category, index: number) => (

                        <Collectioncard item={item} onClick={() => handleFlashCardPageRederection(item.id)} />

                    ))}
                </div>
            </div>

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
        </div>
    )
}