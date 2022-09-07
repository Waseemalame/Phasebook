import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal"
import SignUpForm from "./SignUpForm";

function SignUpFormModal( ) {
  // const dispatch = useDispatch();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>

          <div className="signup-div" onClick={() => setShowSignupModal(true)}>
            <div>
              Create new account
            </div>
          </div>

      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignUpForm setShowSignupModal={setShowSignupModal} />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
