import '../css/Modal.css'

function SavedModal({save, close, titleVar, descVar}) {
    return (
        <div className='modal-background' onClick={close}>
            <div className='modal-card-bg'>
                <h1 className='title-text'>{titleVar}</h1>
                <h2 className='desc-text'>{descVar}</h2>
                <div className='modal-btn-holder'>
                    <button onClick={close} className='tertiary-btn'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default SavedModal