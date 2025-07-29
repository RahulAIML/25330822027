import React, { useState } from 'react';
import api from '../utilities/api'
import { toast } from 'react-toastify'

const BASEURL = 'http://www.td.coffee' // backend base URL
// api instance already configured with this base URL

const UrlForm = () => {
  // state
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState(null)

  // handlers
  const handleChange = e => {
    setLongUrl(e.target.value)
  }

  const submitData = async (e) => {
    e.preventDefault()

    if (!global.auth.getData()) {
      toast.error('please sign in first')
      return
    }
    if (longUrl.length === 0) {
      toast.error('please enter url first')
      return
    }

    try {
      let payloadData = longUrl.toString().trim()
      const res = await api.post('/api', { url: payloadData })
      const result = `${BASEURL}/${res.data.data.shortUrl}`
      setShortUrl(result)
      // toast.success(`Get a short url successfully!`)
      // console.log(shortUrl)  can not print out value immediatly
    } catch (err) {
      console.log(err)
      toast.error(`Something wrong, please try again.`)
    }
  }

  const clearFormData = e => {
    e.preventDefault()
    setLongUrl('')
    setShortUrl(null)
  }

  return (
    <div className="urlForm d-flex justify-content-center align-items-center">
      <form className="urlForm__container d-flex flex-column" onSubmit={submitData}>
        <input
          type="text"
          placeholder="Enter your url here"
          className="urlForm__container__input"
          value={longUrl}
          onChange={handleChange} />

        {/* show result */}
        {shortUrl ? (<div className="urlForm__container__result d-flex justify-content-start">
          Short url: <a href={shortUrl} target='_blank'>{shortUrl}</a>
        </div>) : null}

        <div className="urlForm__container__buttons d-flex">
          <button type="submit" className="createButton" >Create short url</button>
          <button type="button" className="clearButton" onClick={clearFormData}>clear</button>
        </div>
      </form>
    </div>
  )
}

export default UrlForm;
