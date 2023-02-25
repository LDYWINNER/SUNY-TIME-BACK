import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Alert } from "../Components";
import { Wrapper, Logo, Button } from "../assets/wrappers/UpdateUserModal";
import logo from "../assets/images/navbar_logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";

interface IUpdateUserModal {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  school: string;
  major: string;
}

interface IRegisterState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const registerState: IRegisterState = {
  formSuccess: null,
  errorMessage: "",
};

function UpdateUserModal({ isOpen, onClose }: IUpdateUserModal) {
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
        username: "",
        school: "-1",
        major: "-2",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <Wrapper>
            <ModalHeader>My Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Logo src={logo} alt="sunytime" className="logo" />

              <form onSubmit={handleSubmit(onValid)}>
                {values.formSuccess === true && (
                  <Alert message="My Profile Updated!" ifSuccess={true} />
                )}

                {values.formSuccess === false && (
                  <Alert message={values.errorMessage} />
                )}

                <div className="form-row">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    {...register("username", { required: true })}
                    placeholder="USERNAME"
                  ></input>
                </div>

                {errors?.username?.message && (
                  <Alert message={errors.username.message} />
                )}

                <label htmlFor="school" className="form-label">
                  School & Major
                </label>

                <select
                  {...register("school", { required: true })}
                  defaultValue="-1"
                >
                  <option value="-1" disabled>
                    SELECT SCHOOL
                  </option>
                  <option value="1">SBU</option>
                  <option value="2">FIT</option>
                </select>
                <select
                  {...register("major", { required: true })}
                  defaultValue="-2"
                >
                  {watch("school") === "1" ? (
                    <>
                      <option value="-2" disabled>
                        SELECT MAJOR
                      </option>
                      <option value="1">AMS</option>
                      <option value="2">BM</option>
                      <option value="3">CS</option>
                      <option value="4">ECE</option>
                      <option value="5">MEC</option>
                      <option value="6">TSM</option>
                    </>
                  ) : (
                    <>
                      <option value="-2" disabled>
                        SELECT MAJOR
                      </option>
                      <option value="7">FBM</option>
                      <option value="8">FD</option>
                    </>
                  )}
                </select>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Save</Button>
            </ModalFooter>
          </Wrapper>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateUserModal;
