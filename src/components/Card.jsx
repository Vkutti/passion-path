import { useEffect, useState } from 'react'
import '../css/Card.css'
import Modal from './Modal'
import { supabase } from '../lib/supabase'

function Card({ title, desc }) {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const getTitle = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        return {
            
            user: user.email,
            info: { title: title, description: desc },
            uuid: user.id
        };
    };

    const [saved, setSaved] = useState([])

    useEffect(() => {getSaved()}, [])

    async function getSaved() {
        const { data } = await supabase.from("user_saved").select()
        setSaved(data)
    }

    async function uploadData() {
        const information = await getTitle();
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        // Get the user's current row
        const { data: userRows, error: selectError } = await supabase.from("user_saved").select().eq('user', user.email);
        if (selectError) {
            console.error(selectError);
            return;
        }

        if (userRows && userRows.length > 0) {
            // Row exists, merge info arrays
            const currentInfo = userRows[0].info || [];
            // If info is an array, push new info; if it's an object, convert to array
            let newInfo;
            if (Array.isArray(currentInfo)) {
                newInfo = [...currentInfo, information.info];
            } else {
                newInfo = [currentInfo, information.info];
            }
            const { error } = await supabase.from("user_saved")
                .update({ info: newInfo })
                .eq('user', user.email);
            if (error) console.error(error);
            else console.log("Updated info:", newInfo);
        } else {
            // Row does not exist, insert
            const { error } = await supabase.from("user_saved").insert([information]);
            if (error) console.error(error);
            else console.log("Saved:", information);
        }
    }

    return (
        <>
            <div className='card-holder' onClick={openModal}>
                <h1 className='card-text'>{ title }</h1>
            </div>

            {showModal && (<Modal save={uploadData} close={closeModal} titleVar={title} descVar={desc} />)}
        </>
    )
}
export default Card