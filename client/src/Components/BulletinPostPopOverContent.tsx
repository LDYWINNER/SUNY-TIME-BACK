import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

interface IForm {
  title: string;
  content: string;
  board: string;
  anonymity: boolean;
}

interface IRegisterState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const registerState: IRegisterState = {
  formSuccess: null,
  errorMessage: "",
};

function BulletinPostPopOverContent() {
  const [values, setValues] = useState(registerState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = async (data) => {};

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        content: "",
        board: "free",
        anonymity: false,
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </>
  );
}

export default BulletinPostPopOverContent;
