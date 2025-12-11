import type { ComponentProps } from "react";
import TombRaiderItem from "./item";
import TombRaiderItemGroup from "./item-group";
import Models from "./models";

type InventoryGroupProps = ComponentProps<typeof TombRaiderItemGroup>;
const InventoryGroup = ({...props}: InventoryGroupProps) => {
    return (
        <TombRaiderItemGroup {...props}>
            <TombRaiderItem>
                <Models.Shotgun />
            </TombRaiderItem>
            <TombRaiderItem>
                <Models.Magnum />
            </TombRaiderItem>
            <TombRaiderItem>
                <Models.Uzis />
            </TombRaiderItem>
            <TombRaiderItem>
                <Models.LargeMedipack />
            </TombRaiderItem>
            <TombRaiderItem>
                <Models.SmallMedipack />
            </TombRaiderItem>
            <TombRaiderItem>
                <Models.Key />
            </TombRaiderItem>
            <TombRaiderItem>
                <Models.Compass />
            </TombRaiderItem>
            <TombRaiderItem>
                <Models.Pistols />
            </TombRaiderItem>
        </TombRaiderItemGroup>
    );
};

export default InventoryGroup;
