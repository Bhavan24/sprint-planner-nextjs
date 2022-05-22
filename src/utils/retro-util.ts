import { IRetroDetails, IRetrospectiveData } from '../interfaces';

export const getRetro = (data: IRetrospectiveData) => {
    if (data.action_items && data.went_well && data.to_improve) {
        const action_item_len = data.action_items.length;
        const went_well_len = data.went_well.length;
        const to_improve_len = data.to_improve.length;
        const largest = Math.max(action_item_len, went_well_len, to_improve_len);
        const details: IRetroDetails[] = [];
        for (let i = 0; i < largest; i++) {
            const retro = {
                went_well: data.went_well[i],
                to_improve: data.to_improve[i],
                action_items: data.action_items[i],
            };
            details.push(retro);
        }
        console.log(details);
        return details;
    }
    return [];
};
