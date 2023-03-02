// @ts-nocheck
/** */
export const actions = {
    /*
    action_name : async (event) => {
        let data = await event.request.formData();
        return { success : true };
    }
    */

    save :/** @param {import('./$types').RequestEvent} event */  async(event) => {
        let data = await event.request.formData();
    }
};