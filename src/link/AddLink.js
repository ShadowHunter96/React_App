import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { confirm } from './Confirmation';

const AddLink = () => {
    let navigate = useNavigate();
    let { id } = useParams(); 

    const [link, setLink] = useState({
        name: '',
        url: '',
        description: '',
        availableInFirefox: false,
        availableInChrome: false,
        active: true,
        openInNewWindow: false
    });

    const{name,url,description,availableInFirefox,availableInChrome,active,openInNewWindow} = link

    useEffect(() => {
        if (id) {
            loadLink(id);
        }
    }, [id]);

    const loadLink = async (id) => {
        const result = await axios.get(`http://localhost:8081/links-api/link/${id}`);
        setLink(result.data);
    };

    

    const onInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLink({ ...link, [e.target.name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name || !url || !description) {
          alert("Please fill in all mandatory fields.");
          return;
        }

        const linkToSave={
          id,
          name,
          url,
          description,
          availableInChrome,
          openInNewWindow,
          availableInFirefox,
          active
        }

        try {
          let response;
          if (id) {
              response = await axios.put(`http://localhost:8081/links-api/update/${id}`, linkToSave);
          } else {
              response = await axios.post('http://localhost:8081/links-api/save', linkToSave);
          }
          console.log('Response data:', response.data); // Zaloguje celý objekt
console.log('Link to save:', linkToSave); // Zaloguje celý objekt

// nebo

console.log('Response data:', JSON.stringify(response.data, null, 2)); // Zobrazí objekt jako formátovaný JSON řetězec
console.log('Link to save:', JSON.stringify(linkToSave, null, 2)); // Zobrazí objekt jako formátovaný JSON řetězec


          navigate('/'); 
      } catch (error) {
          console.error('Error saving link:', error);
      } 
  };

    const deleteLink = async () => {
      confirm('Are you sure you want to delete this link?', 'Yes', 'No')
        .then(async (result) => {
          if (result) {
            await axios.delete(`http://localhost:8081/links-api/delete/${id}`);
            navigate('/');
          }
        });
    };

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                  <h2 className="text-center">{id ? 'Edit Link' : 'Add Link'}</h2>
                  <form onSubmit={(e) => onSubmit(e)}>
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text" className="form-control" name="name" value={link.name} onChange={onInputChange} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="url" className="form-label">URL</label>
                          <input type="text" className="form-control" name="url" value={link.url} onChange={onInputChange} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <textarea className="form-control" name="description" value={link.description} onChange={onInputChange} />
                      </div>
                      <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" name="availableInFirefox" checked={link.availableInFirefox} onChange={onInputChange} />
                          <label className="form-check-label" htmlFor="availableInFirefox">Available in Firefox</label>
                      </div>
                      <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" name="availableInChrome" checked={link.availableInChrome} onChange={onInputChange} />
                          <label className="form-check-label" htmlFor="availableInChrome">Available in Chrome</label>
                      </div>
                      <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" name="active" checked={active} onChange={onInputChange} />
                           <label className="form-check-label" htmlFor="active">Is Active</label>
                            </div>
                      <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" name="openInNewWindow" checked={link.openInNewWindow} onChange={onInputChange} />
                          <label className="form-check-label" htmlFor="openInNewWindow">Open in New Window</label>
                      </div>
                      <button type="submit" className="btn btn-outline-primary">
                          Submit
                      </button>
                      {id && ( // Zde je podmínka pro zobrazení tlačítka Delete
                    <button className="btn btn-danger mx-2" onClick={() => deleteLink(link.id)}>Delete</button>
                )}
                      <Link to="/" className="btn btn-outline-danger mx-2">
                          Cancel
                      </Link>
                  </form>
              </div>
          </div>
      </div>
  );
  
};

export default AddLink;
