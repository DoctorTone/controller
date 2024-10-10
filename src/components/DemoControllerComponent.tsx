import { PropsWithChildren, useState, useEffect } from "react";
import { createPortal } from "@react-three/fiber";
import {
  XRControllerGamepadComponentId,
  XRControllerLayout,
  getXRControllerComponentObject,
} from "@pmndrs/xr";
import { Group, Object3D } from "three";

const DemoControllerComponent = ({
  id,
  layout,
  model,
  children,
}: PropsWithChildren<{
  id: XRControllerGamepadComponentId;
  model: Group;
  layout: XRControllerLayout;
}>) => {
  const [object, setObject] = useState<Object3D | undefined>(undefined);

  useEffect(() => {
    if (!model) {
      return;
    }
    const object = getXRControllerComponentObject(model, layout, id);

    setObject(object);
  }, [model, layout, id]);
  if (object == null) {
    return null;
  }
  return createPortal(children, object);
};

export default DemoControllerComponent;
