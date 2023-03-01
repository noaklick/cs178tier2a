/** @type {import('./$types').Actions} */
export const actions = {
    /*
    action_name : async (event) => {
        let data = await event.request.formData();
        return { success : true };
    }
    */

    save : async(event) => {
        let data = await event.request.formData();
    }
};