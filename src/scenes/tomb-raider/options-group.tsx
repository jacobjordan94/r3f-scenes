import type { ComponentProps } from "react";
import TombRaiderItem from "./item";
import TombRaiderItemGroup from "./item-group";
import Models from "./models";

type OptionsGroupProps = ComponentProps<typeof TombRaiderItemGroup>;
const OptionsGroup = ({...props}: OptionsGroupProps) => {
    return (
        <TombRaiderItemGroup {...props}>
            <TombRaiderItem>
                <Models.Sunglasses />
            </ TombRaiderItem>
            <TombRaiderItem>
                <Models.HeadphonesCassette />
            </ TombRaiderItem>
            <TombRaiderItem>
                <Models.Controls />
            </ TombRaiderItem>
            <TombRaiderItem>
                <Models.Passport />
            </ TombRaiderItem>
        </TombRaiderItemGroup>
    );
};

export default OptionsGroup;
