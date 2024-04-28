"use server";

export const Translate = async (data, textInput) => {
    const { source, target } = data;
    const input = textInput;

    // if(!input) return null;

    // return {
    //     translation: `this is a translation input: ${input} from ${source} to ${target}.`,
    //     source: source,
    //     target: target,
    //     input: input
    // }
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!input) {
                resolve(null);
            } else {
                const translationObj = {
                    translation: ` ${input}.`,
                    source: source,
                    target: target,
                    input: input
                };
                resolve(translationObj);
            }
        }, 3000);
    });
}