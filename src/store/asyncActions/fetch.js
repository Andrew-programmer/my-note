class AsyncActions {
    authorization(token){
        return {'Authorization': `Bearer ${token}`}
    }

    formatData(data){
        return JSON.stringify(data);
    }

    async POST(url, body, params = {}) {
        return await fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                ...params
            }
        })
    }

    async PUT(url, body, params = {}) {
        return await fetch(url, {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                ...params
            }
        })
    }

    async putFormData(url, formData, params = {}){
        return await fetch(url, {
            method: 'PUT',
            body: formData,
            headers: {
                ...params
            }
        })
    }

    async GET(url, params = {}) {
        return await fetch(url, {
            headers: {
                ...params
            }
        })
    }

    async PATCH(url, body, params = {}) {
        await fetch(url, {
            method: 'PATCH',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                ...params
            }
        })
    }

    async DELETE(url, params = {}) {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...params
            }
        })
    }

}

export default AsyncActions;
