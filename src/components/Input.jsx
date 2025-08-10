import '../css/Input.css'

function Input({value, setValue, placeholderText}) {
    return (
        <div style={{ width: "100%" }}>
            <input
                className='inputbox'
                value={value || ""}
                type="text"
                placeholder={placeholderText}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    )
}

export default Input