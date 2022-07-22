import axios from "axios";
let host = `http://localhost:`
let port = 1337;
let route = '/api/events'
export default {
    getData() {
        let resp = {
            success: true,
            data: []
        }
        let url = `${host}${port}${route}`
        // TODO: Cambiar a fetch vuejs
        axios.get(
            url, {
                headers: {
                    'Content-Type': `application/json`
                }
            })
            .then((data) => {
                try {
                    console.log(data)
                    if (!data.success || data.data.lenght == 0) throw data.msj;
                    resp.data = data.data;
                } catch (e) {
                    resp.data = e;
                }
            })
            .catch((e) => {
                resp.success = false;
                resp.data = "Hubo un error al cargar los eventos";
            });
        return resp;
    },
};