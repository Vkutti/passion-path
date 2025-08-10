import { useState } from 'react'
import '../css/Card.css'
import Modal from './Modal'

function Card({ title, desc }) {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    return (
        <>
            <div className='card-holder' onClick={openModal}>
                <h1 className='card-text'>{ title }</h1>
            </div>

            {showModal && (<Modal close={closeModal} titleVar={title} descVar={desc} />)}
        </>
    )
}
export default Card