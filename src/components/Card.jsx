import { useState } from 'react'
import '../css/Card.css'
import Modal from './Modal'
import { supabase } from '../lib/supabase'

function Card({ title, desc }) {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const getSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        return { session, error };
    }




    return (
        <>
            <div className='card-holder' onClick={openModal}>
                <h1 className='card-text'>{ title }</h1>
            </div>

            {showModal && (<Modal save={console.log("hi")} close={closeModal} titleVar={title} descVar={desc} />)}
        </>
    )
}
export default Card