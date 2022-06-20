import { useState } from 'react';
import { Modal } from '../../context/Modal';

const EditAddressModal = (props) => {
  const {
    firstName, setFirstName,
    lastName, setLastName,
    address, setAddress,
    city, setCity,
    state, setState,
    zip, setZip,
    country, setCountry
  } = props;
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    console.log('TODO: CONNECT TO BACKEND');
    setShowModal(false);
  };

  return (
    <>
      <div>
        <button
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        {showModal &&
          <Modal onClose={() => setShowModal(false)}>
            <div className='edit-address-form__container'>
              <div>
                <span>First name:</span>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <span>Last name:</span>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <span>Address:</span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <span>City:</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <span>State:</span>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div>
                <span>Zip code:</span>
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <div>
                <span>Country:</span>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        }
      </div>
    </>
  );
};

export default EditAddressModal;
