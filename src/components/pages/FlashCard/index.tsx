import { Typography } from "components/atoms/Typography"
import { NavBar } from "components/organisms/NavBar"
import { ChangeEvent, useEffect, useState } from "react"
import { Modal } from "components/molecules/Modal"
import { Button } from "components/atoms/Button"
import { Flashcard } from "components/molecules/Card/FlashCard"
import { CloseIcon } from "components/atoms/Icons/CloseIcon"
import { Input } from "components/atoms/Input/input"
import { TextArea } from "components/atoms/TextArea/input"
import { useParams } from "react-router-dom"
import { useAddFlashCardMutation, useGetFlashCardSetByIdQuery, useGetFlashCardsQuery } from "services/flashCardApi"
import { useAddTelemetryMutation } from "services/telemetryApi"
import { flashCard, telemetry } from "utils/types"
import loadingSvg from "assets/loading.gif";
import "./index.scss"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { ReviewComponent } from "components/molecules/Review"

export const FlashCards = () => {

    const { id } = useParams<{ id: string }>(); // Extract the `id` from the route parameters
    const { data, isLoading, error, refetch } = useGetFlashCardsQuery(id!);
    const { data: flashCardSetData, isLoading: flashCardSetIsLoading, error: flashCardSetIsError } = useGetFlashCardSetByIdQuery(id!);
    const [addFlashCard, { isLoading: addFlashCardisLoading, isError: addFlashCardisError, isSuccess: addFlashCardisSuccess }] = useAddFlashCardMutation();
    const [addTelemetry, { isLoading: addTelemetryisLoading, isError: addTelemetryisError, isSuccess: addTelemetryisSuccess }] = useAddTelemetryMutation();
    const [searchvalue, setSearchValue] = useState("")
    const [flashCardQuestion, setflashCardQuestion] = useState("")
    const [flashCardAnswer, setflashCardAnswer] = useState("")
    const [isOn, setIsOn] = useState(false);
    const [isFlashCardShowModalOpen, setIsFlashCardShowModalOpen] = useState(false)
    const [isFlashCardAddModalOpen, setIsFlashCardAddModalOpen] = useState(false)
    const [isReviewShow, setIsReviewShow] = useState(false)
    const [isReviewAdd, setIsReviewAdd] = useState(false)
    const [selectedFlashCard, setSelectedFlashCard] = useState<flashCard | null>(null)
    const [startTime, setStartTime] = useState<Date | null>(null)


    const handleFlashCardOpen = (item: flashCard) => {

        let selectedItem: flashCard = {
            id: item.id,
            user_id: item.user_id,
            flash_card_set_id: item.flash_card_set_id,
            question: item.question,
            answer: item.answer,
        }
        setSelectedFlashCard(prev => selectedItem)
        setStartTime(new Date())
        setIsFlashCardShowModalOpen(true)
    }

    const handleModalClose = async () => {

        if (isFlashCardShowModalOpen) {
            let telemetry: telemetry = {
                flashCardId: selectedFlashCard?.id,
                action: "view",
                startAt: startTime,
                endAt: new Date(),
            }

            try {
                const response = await addTelemetry(telemetry).unwrap();
            } catch (error) {
                console.error("Error adding flashcard:", error);
            }
        }

        setIsFlashCardShowModalOpen(prev => !prev)
        setSelectedFlashCard(prev => null)

    }

    const handleFlashCardAddModalClose = () => {
        setIsFlashCardAddModalOpen(prev => !prev)
    }

    const toggleSwitch = async () => {
        if (!isOn) {
            let telemetry: telemetry = {
                flashCardId: selectedFlashCard?.id,
                action: "resolve",
                startAt: startTime,
                endAt: new Date(),
            }

            try {
                const response = await addTelemetry(telemetry).unwrap();
            } catch (error) {
                console.error("Error adding flashcard:", error);
            }
        }
        setIsOn(prev => !prev)
    }


    const handleflashCardQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setflashCardQuestion(e.target.value)
    }

    const handleflashCardAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setflashCardAnswer(e.target.value)
    }

    const handleClear = () => {
        setflashCardQuestion(prev => "")
        setflashCardAnswer(prev => "")

    }

    const handleAddFlashCard = async () => {

        if (flashCardAnswer && flashCardAnswer) {
            const payload = {
                question: flashCardQuestion,
                answer: flashCardAnswer,
                categoryId: id,
            };

            try {
                const response = await addFlashCard(payload).unwrap();
                toast.success("Flash Card Created successfully!", {
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
                setflashCardQuestion(prev => "")
                setflashCardAnswer(prev => "")
                refetch()
                handleFlashCardAddModalClose()
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

    const handleShowReview = async () => {


    };

    const handleAddReview = async () => {

setIsReviewAdd((prev:boolean)=>!prev)

    };


    return (
        <div className="flash-card-page-wrapper">
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
                        <Typography label={flashCardSetData?.name} variant="h2" className="collection-text-style" />
                    </div>
                    <div className="add-flash-card-wrapper">

                        <Button label="Show Reviews" type="primary" onClick={handleShowReview} isLoading={false} />
                        <Button label="Add Review" type="secondary" onClick={handleAddReview} isLoading={false} />
                        <Button label="Add FlashCard" type="warning" onClick={handleFlashCardAddModalClose} isLoading={false} />
                    </div>
                </div>

                <div className="collection-description-wrapper">

                    <Typography label={flashCardSetData?.description} variant="p" className="collection-count-text-style" />

                </div>

                <div className="flash-cards-container">

                    {data?.map((item: flashCard, index: number) => (

                        <Flashcard item={item} onClick={() => handleFlashCardOpen(item)} />

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
                        {/* <Typography variant="h3" label="Flash Card Title" /> */}
                        <div className={`switch-container ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
                            <div className="switch">
                                <div className="switch-handle"></div>
                            </div>

                        </div>
                        <Typography className="label" variant="h5" label={isOn ? "ANSWER" : "QUESTION"} />
                    </div>

                    {isOn ? <Typography variant="p" label={selectedFlashCard?.answer ? selectedFlashCard?.answer : "No answer"} />
                        : <Typography variant="p" label={selectedFlashCard?.question ? selectedFlashCard?.question : "No question"} />}

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
                    <Input placeHolder="Question" onChange={handleflashCardQuestionChange} value={flashCardQuestion} className="add-flash-card-input-style" />
                    <TextArea placeHolder="Answer" onChange={handleflashCardAnswerChange} value={flashCardAnswer} className="add-flash-card-input-style" />
                    <div className="Button-wrapper">
                        <Button onClick={handleClear} label="Clear" type="danger" isLoading={false} />
                        <Button onClick={handleAddFlashCard} label="Submit" type="success" isLoading={addFlashCardisLoading} isDisable={!flashCardAnswer || !flashCardQuestion} />
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isReviewAdd} onClose={handleAddReview}>
                <ReviewComponent setId={id}/>
            </Modal>
        </div>
    )
}