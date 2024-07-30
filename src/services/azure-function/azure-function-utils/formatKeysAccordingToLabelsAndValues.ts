import { GeneralFormsType } from "@/components/Form/FormTypes";

export function formatKeysAccordingToLabelsAndValues<T>(
    formsConfig: GeneralFormsType<T>[], 
    keyToRemove: string[]
): Record<string, string | string[] | number> {
    return formsConfig.reduce((acm, cur) => {
        let auxiliarObj = {};

        // LEFT SIDE FLOW
        if (!cur.section.leftSide.length) {
            auxiliarObj = { ...acm };
        }

        const hasMoreSection = cur.section.leftSide.length > 1;
        if (hasMoreSection) {
            const innerSection = cur.section.leftSide.reduce(
                (acumul, current) => keyToRemove.includes(current.key as string)
                    ? { ...acumul }
                    : { ...acumul, [current.key]: current.label },
                {}
            );
            auxiliarObj = {
                ...acm,
                ...innerSection,
            };
        } else {
            const singleSectionData = cur.section.leftSide[0];
    
            if (keyToRemove.includes(singleSectionData.key as string)) auxiliarObj = { ...acm };

            auxiliarObj = {
                ...acm,
                [singleSectionData.key]: singleSectionData.label,
            };
        }

        // RIGHT SIDE FLOW
        if (!cur.section.rightSide.length) {
            auxiliarObj = { ...auxiliarObj };
            return auxiliarObj;
        }

        const hasMoreSectionRightSide = cur.section.rightSide.length > 1;
        if (hasMoreSectionRightSide) {
            const innerSection = cur.section.rightSide.reduce(
                (acumul, current) => keyToRemove.includes(current.key as string)
                    ? { ...acumul }
                    : { ...acumul, [current.key]: current.label },
                {}
            );
            auxiliarObj = {
                ...auxiliarObj,
                ...acm,
                ...innerSection,
            };
        } else {
            const singleSectionDataRightSide = cur.section.rightSide[0];
    
            if (keyToRemove.includes(singleSectionDataRightSide.key as string)) auxiliarObj = { ...auxiliarObj, ...acm };
    
            auxiliarObj = {
                ...auxiliarObj,
                ...acm,
                [singleSectionDataRightSide.key]: singleSectionDataRightSide.label,
            };
        }


        return auxiliarObj;
    }, {});
}