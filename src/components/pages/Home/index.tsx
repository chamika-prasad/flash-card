import { Typography } from "components/atoms/Typography"
import { NavBar } from "components/organisms/NavBar"
import { ChangeEvent, useState } from "react"
import { Collectioncard } from "components/molecules/Card/Collectioncard"
import { Button } from "components/atoms/Button"
import { Modal } from "components/molecules/Modal"
import { Input } from "components/atoms/Input/input"
import { CloseIcon } from "components/atoms/Icons/CloseIcon"
import { useNavigate } from "react-router-dom"
import "./index.scss"

export const Home = () => {
    const navigate = useNavigate();
    const [searchvalue, setSearchValue] = useState("")
    const [flashCardCollectionName, setFlashCardCollectionName] = useState("")
    const [isFlashCardCollectionAddModalOpen, setIsFlashCardCollectionAddModalOpen] = useState(false)

    const handleFlashCardPageRederection =()=>{
        navigate("collection/id")
    }

    
    const handleFlashCardTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFlashCardCollectionName(e.target.value)
    }

    const handleClear =()=>{
        console.log("clear");
        
    }

    const handleSubmit =()=>{
        console.log("clear");
        
    }

    const handleModalClose = () => {
        setIsFlashCardCollectionAddModalOpen(prev => !prev)
    }

    return (
        <div className="home-page-wrapper">
            <NavBar searchValue={searchvalue} setSearchValue={setSearchValue} />
            <div className="content-wrapper">
                <div className="collection-text-btn-wrapper">
                    <div className="collection-text-wrapper">
                        <Typography label="Flash Card Collections" variant="h2" className="collection-text-style" />
                        <Typography label="30" variant="h2" className="collection-count-text-style" />
                    </div>
                    <Button label="Add Collection" type="warning" onClick={handleModalClose}/>
                </div>

                <div className="collections-card-container">

                    {Array.from({ length: 10 }).map((_, index) => (

                        <Collectioncard title="title" description="description" onClick={handleFlashCardPageRederection}/>

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
                    <Input placeHolder="Collection Name" onChange={handleFlashCardTitleChange} value={flashCardCollectionName} className="add-flash-card-input-style"/>
                
                    <div className="Button-wrapper">
                        <Button onClick={handleClear} label="Clear" type="danger"/>
                        <Button onClick={handleSubmit} label="Submit" type="success"/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}