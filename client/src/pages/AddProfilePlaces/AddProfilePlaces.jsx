import React, { useState, useEffect, useContext } from "react";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import "./AddProfilePlaces.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../hooks/useUserContext";
import { BASE_URL } from "../../components/App/App";

const AddProfilePlaces = () => {
  const { user } = useUserContext();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoDev, setPhotoDev] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(10000);
  const [redirect, setRedirect] = useState(false);
  const [owner, setOwner] = useState("");
  const [length, setLength] = useState(0);

  const id = location.pathname.split("/")[3];

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const getuser = async () => {
    if (id == "new") {
      setOwner(user.email);
    } else {
      await axios.get(`${BASE_URL}/places/${id}`).then((response) => {
        setOwner(response.data.owner);
        setTitle(response.data.title);
        setAddress(response.data.address);
        setAddedPhotos(response.data.photos);
        setDescription(response.data.description);
        setPerks(response.data.perks);
        setExtraInfo(response.data.extraInfo);
        setCheckIn(response.data.checkIn);
        setCheckOut(response.data.checkOut);
        setMaxGuests(response.data.maxGuests);
        setPrice(response.data.price);
      });
    }
  };
  useEffect(() => {
    getuser();
  }, [id]);

  const handleCbClick = (ev) => {
    const { checked, name } = ev.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)]);
    }
  };

  const handelPhoto = () => {
    addedPhotos.push(photo);
    setPhoto("");
  };

  const handelPhotoDevice = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPhotoDev(base64);
    e.target.value = null;
  };

  const handelPhotoClick = () => {
    if (photoDev) {
      addedPhotos.push(photoDev);
      setPhotoDev("");
    }
  };

  const deletePicture = () => {
    addedPhotos.pop();
    setAddedPhotos(addedPhotos);
    setLength(length + 1);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const placeData = {
      owner,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id == "new") {
      await axios.post(`${BASE_URL}/places`, placeData);
      setRedirect(true);
    } else {
      await axios.put(`${BASE_URL}/places`, { id, ...placeData });
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={`/places`} />;
  }

  return (
    <div className="place-form-container">
      <div className="profile-nav-parent">
        <ProfileNavbar />
      </div>
      <form onSubmit={handelSubmit} className="form">
        <div className="form-top">
          <div className="input-feild">
            <h2>Title</h2>
            <p>Title Should be Short but Catchy</p>
            <input
              required
              maxLength={50}
              placeholder="Max Characters: 50"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              type="text"
            />
          </div>
          <div className="input-feild">
            <h2>Address</h2>
            <p>Address of the Place</p>
            <input
              required
              placeholder="Ex: Delhi, India"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              type="text"
            />
          </div>
        </div>
        <div className="form-top">
          <div className="input-feild">
            <h2>Description</h2>
            <p>Description of the Place</p>
            <input
              required
              maxLength={500}
              placeholder="Max Characters: 500"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              type="text"
            />
          </div>
          <div className="input-feild">
            <h2>Extra Information</h2>
            <p>House Rules Etc</p>
            <input
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
              type="text"
            />
          </div>
        </div>

        <div className="input-feild">
          <h2>Images</h2>
          <p>More = Better</p>

          <div className="form-top">
            <div className="input-image">
              <input
                type="text"
                value={photo}
                onChange={(ev) => setPhoto(ev.target.value)}
                placeholder="Add Links one by one"
              />
              <div className="add-img-btn" onClick={handelPhoto}>
                Add
              </div>
            </div>

            <div className="input-image">
              <label htmlFor="file-upload">
                <i className="fa-solid fa-cloud-arrow-up"></i> Upload Image
              </label>
              <input
                type="file"
                lable="Image"
                name="myFile"
                className="file-upload"
                id="file-upload"
                accept=".jpeg, .png, .jpg , .webp"
                onChange={(ev) => handelPhotoDevice(ev)}
              />
              <div className="add-img-btn" onClick={handelPhotoClick}>
                Add
              </div>
            </div>
            {addedPhotos.length > 0 ? (
              <div onClick={deletePicture} className="image-button">
                Remove Photo
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="img-span-parent">
            {addedPhotos.map((item, index) => (
              <div key={index} className="img-preview-parent">
                <img className="img-span" src={item} alt={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="form-top">
          <div className="input-feild">
            <h2>Perks</h2>
            <p>Checkmark Perks</p>
            <div className="perks">
              <label>
                <input
                  checked={perks.includes("wifi")}
                  name="wifi"
                  onChange={handleCbClick}
                  type="checkbox"
                />
                <i className="fa-solid fa-wifi"></i>
                <span>WiFi</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={perks.includes("parking")}
                  name="parking"
                  onChange={handleCbClick}
                />
                <i className="fa-solid fa-car"></i>
                <span>Parking</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={perks.includes("pool")}
                  name="pool"
                  onChange={handleCbClick}
                />
                <i className="fa-solid fa-water-ladder"></i>
                <span>Pool</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={perks.includes("tv")}
                  name="tv"
                  onChange={handleCbClick}
                />
                <i className="fa-solid fa-tv"></i>
                <span>TV</span>
              </label>
            </div>
          </div>

          <div className="input-feild">
            <h2>CheckIn and CheckOut</h2>
            <p></p>
            <div className="number-inputs">
              <input
                required
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="Checkin Time (enter digits in 24 hrs format) "
              />
              <input
                required
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                type="text"
                placeholder="Checkout Time (enter digits in 24 hrs format)"
              />
            </div>
          </div>
        </div>

        <div className="form-top">
          <div className="input-feild">
            <h2>Maximum Guests</h2>
            <p></p>
            <div className="number-inputs">
              <input
                required
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                type="number"
                min={1}
                placeholder="Max Guests"
              />
            </div>
          </div>
          <div className="input-feild">
            <h2>Price Per Person Per Night</h2>
            <p>In Rupees</p>
            <div className="number-inputs">
              <input
                min={1}
                required
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                type="number"
                placeholder="Price"
              />
            </div>
          </div>
        </div>

        <button className="submit-form">Save</button>
      </form>
    </div>
  );
};

export default AddProfilePlaces;
