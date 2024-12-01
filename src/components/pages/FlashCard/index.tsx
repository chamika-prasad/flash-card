import { Typography } from "components/atoms/Typography"
import { NavBar } from "components/organisms/NavBar"
import { ChangeEvent, useState } from "react"
import "./index.scss"
import { Modal } from "components/molecules/Modal"
import { Button } from "components/atoms/Button"
import { Flashcard } from "components/molecules/Card/FlashCard"
import { CloseIcon } from "components/atoms/Icons/CloseIcon"
import { Input } from "components/atoms/Input/input"
import { TextArea } from "components/atoms/TextArea/input"

export const FlashCards = () => {
    const [searchvalue, setSearchValue] = useState("")
    const [flashCardTitle, setFlashCardTitle] = useState("")
    const [flashCardDescription, setFlashCardDescription] = useState("")
    const [isOn, setIsOn] = useState(false);
    const [isFlashCardShowModalOpen, setIsFlashCardShowModalOpen] = useState(false)
    const [isFlashCardAddModalOpen, setIsFlashCardAddModalOpen] = useState(false)

    const handleCollectionAdd = () => {
        console.log("add collection");
    }

    const handleFlashCardOpen = () => {
        setIsFlashCardShowModalOpen(true)
    }

    const handleModalClose = () => {
        setIsFlashCardShowModalOpen(prev => !prev)
    }

    const handleFlashCardAddModalClose = () => {
        setIsFlashCardAddModalOpen(prev => !prev)
    }

    const toggleSwitch = () => {
        setIsOn(prev => !prev)
    }


    const handleFlashCardTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFlashCardTitle(e.target.value)
    }

    const handleFlashCardDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFlashCardDescription(e.target.value)
    }

    const handleClear =()=>{
        console.log("clear");
        
    }

    const handleSubmit =()=>{
        console.log("clear");
        
    }

    return (
        <div className="flash-card-page-wrapper">
            <NavBar searchValue={searchvalue} setSearchValue={setSearchValue} />
            <div className="content-wrapper">
                <div className="collection-text-btn-wrapper">
                    <div className="collection-text-wrapper">
                        <Typography label="Collection Title" variant="h2" className="collection-text-style" />
                    </div>
                    <Button label="Add FlashCard" type="warning" onClick={handleFlashCardAddModalClose} />
                </div>

                <div className="collection-description-wrapper">

                    <Typography label="Collection Description" variant="p" className="collection-count-text-style" />

                </div>

                <div className="flash-cards-container">

                    {Array.from({ length: 10 }).map((_, index) => (

                        <Flashcard title="title" description="description" onClick={handleFlashCardOpen} />

                    ))}
                </div>
            </div>
            <Modal isOpen={isFlashCardShowModalOpen} onClose={handleModalClose}>
                <div className="flash-card-modal-wrapper">
                    <div className="top-wrapper">
                        <CloseIcon
                            className="close-icon-styles"
                            onClick={handleModalClose}
                        />
                    </div>
                    <div className="flash-card-title-container">
                        <Typography variant="h3" label="Flash Card Title" />
                        <div className={`switch-container ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
                            <div className="switch">
                                <div className="switch-handle"></div>
                            </div>
                            <Typography className="label" variant="h5" label={isOn ? "Answer" : "Question"} />
                        </div>
                    </div>

                    {isOn ? <Typography variant="p" label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                        : <Typography variant="p" label="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" />}

                </div>
            </Modal>

            <Modal isOpen={isFlashCardAddModalOpen} onClose={handleFlashCardAddModalClose}>
                <div className="flash-card-modal-wrapper">
                    <div className="top-wrapper">
                        <CloseIcon
                            className="close-icon-styles"
                            onClick={handleFlashCardAddModalClose}
                        />
                    </div>
                    <Input placeHolder="Title" onChange={handleFlashCardTitleChange} value={flashCardTitle} className="add-flash-card-input-style"/>
                    <TextArea placeHolder="Title" onChange={handleFlashCardDescriptionChange} value={flashCardDescription} className="add-flash-card-input-style"/>
                    <div className="Button-wrapper">
                        <Button onClick={handleClear} label="Clear" type="danger"/>
                        <Button onClick={handleSubmit} label="Submit" type="success"/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}