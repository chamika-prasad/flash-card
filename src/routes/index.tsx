import { Route, Routes } from "react-router-dom"
import { Home } from "components/pages/Home"
import { FlashCards } from "components/pages/FlashCard"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection/:id" element={<FlashCards />} />
        </Routes>
    )
}