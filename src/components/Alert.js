import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {

        if (word === "danger") {
            word = "Error";
        }

        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }

    return (
        <div style={{ height: "45px" }}>
            {props.alert && <div className={`alert alert-${props.alert.alert} alert-dismissible fade show`} role="alert">
                {/* props/alert.alert means which type of alert  */}
                <strong>{capitalize(props.alert.alert)}</strong>: {props.alert.msg}
            </div >}
        </div>

    )
}