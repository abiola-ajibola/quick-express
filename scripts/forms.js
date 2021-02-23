class Form {

    /**
     * @param {*}  selector a string representing the CSS selector of the form element
     * @param {*}  submitUrl a URL string for the form target
     * @param {*}  errorElementSelector a string representing the CSS selector of the error popup
     * @param {*}  showErrorSelector a string representing the CSS class selector that displays the error popup
     */

    init = function ({
        selector = "",
        submitUrl = "",
        showErrorSelector = "",
        closeModalSelector = "",
        submitFormat = "",
        errorClass="",
        noResponse = false
    }) {

        const selectElement = (selector = "") => {
            return document.querySelector(selector)
        }
        
        /**
         * @param {*} fieldsObject An object that contains keys representing classes of the error message elements
         *                         and the corresponding error messages for each element.                          
         */

        // const showError = (selector = showErrorSelector) => {
        //     errorElement.classList.add(selector)
        //     errorElement.appendChild(document.createTextNode(errorMessage))
        // }

        const showError = (fieldsObject = {}) => {
            Array.from(Object.entries(fieldsObject)).map(entry => {
                const errorElement = selectElement(`.${entry[0]}-error`)
                const textNode = document.createTextNode(entry[1])
                errorElement.innerHTML= ''
                console.log(`.${entry[0]}-error`)
                errorElement.classList.add(showErrorSelector)
                errorElement.appendChild(textNode)
            })
            
        }

        /**
         * @param {*} form_data Converts the passed FormData object into a JSON object
         */

        const formDataToJson = (form_data) => {
            let dataArray = Array.from(form_data.entries())
            let formObj = {};
            dataArray.map(data => {
                formObj = Object.assign(formObj, { [data[0]]: data[1] })
            })
            return JSON.stringify(formObj)
        }

        /**
         * 
         * @param {*} fields an object of form fields, the keys represent the name of the field and the values
         * represent the values of the fields
         */

        const highlightInputs = (fields) => {
            Object.keys(fields).map(field => {
                document.querySelector(`[name="${field}"]`).classList.add(errorClass)
            })
        }

        // const removeHighlights = (fields) => {
        //     Object.keys(fields).map(field => {
        //         document.querySelector(`[name="${field}"]`).classList.remove('border__red')
        //     })
        // }

        const form = selectElement(selector)
        // const errorElement = selectElement(errorElementSelector)
        let closeModal
        if (closeModalSelector) {
            closeModal = selectElement(closeModalSelector)
        }

        /**
         * 
         * @param {*} format string, the format of data to be sent 'json' or 'formData'
         */

        const submitForm = ({ format = '' }) => {
            // console.log(`url: ${submitUrl}`)
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    if (closeModalSelector) closeModal.click()
                    if (format === 'json') {
                        let req = formDataToJson(new FormData(e.target));
                        fetch(submitUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: req
                        })
                            .then(response => response.json())
                            .then(data => {
                                // console.log(data)
                                if (noResponse) {
                                    console.log("Success")
                                }
                                else {
                                    if (data.status === 'ok') {
                                        window.location.href = data.redirect
                                    } else {
                                        // console.log(data.fields)
                                        // showError(errorsObject)
                                        console.log(data.fields)
                                        showError(data.fields)
                                        highlightInputs(data.fields)
                                    }
                                }
                            })
                    }
                    else if (format === 'formData') {
                        let req = new FormData(e.target);
                        fetch(submitUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            body: req
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (noResponse) {
                                    console.log("Success")
                                }
                                else {
                                    if (data.status === 'ok') {
                                        window.location.href = data.redirect
                                    } else {
                                        // showError(showErrorSelector)
                                        showError(errorsObject)
                                        highlightInputs(data.fields)
                                    }
                                }
                            })
                    }
                    else throw new Error(`Type Error: ${format} is not a recognised format`)
                }
            } else throw new Error("No DOM Element has been selected")
        };
        submitForm({ format: submitFormat })
    }
}