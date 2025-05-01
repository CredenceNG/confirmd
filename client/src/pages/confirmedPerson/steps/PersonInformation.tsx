import type { PersonInformation as PersonInfoType } from '../../../slices/confirmedPerson/confirmedPersonSlice'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'

import { fadeDelay } from '../../../FramerAnimations'
import { useAppDispatch } from '../../../hooks/hooks'
import { useConfirmedPerson } from '../../../slices/confirmedPerson/confirmedPersonSelectors'
import { updatePersonInformation } from '../../../slices/confirmedPerson/confirmedPersonSlice'
// Import PersonInformation type with a different name to avoid conflict

export const PersonInformation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { personInformation } = useConfirmedPerson()
  const [documentImages, setDocumentImages] = useState<{ label: string; data: string }[]>(
    personInformation.documentImages || []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    dispatch(updatePersonInformation({ [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, label: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        const updatedImages = [...documentImages.filter((img) => img.label !== label), { label, data: base64String }]
        setDocumentImages(updatedImages)
        dispatch(updatePersonInformation({ documentImages: updatedImages }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-start overflow-auto py-4">
      <motion.h1
        variants={fadeDelay}
        initial="hidden"
        animate="show"
        className="title-font dark:text-white text-center text-2xl sm:text-3xl md:text-4xl mb-6"
      >
        Personal Information
      </motion.h1>
      <motion.div variants={fadeDelay} initial="hidden" animate="show" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="familyName" className="block text-sm font-medium dark:text-white mb-1">
              Family Name
            </label>
            <input
              type="text"
              name="familyName"
              id="familyName"
              value={personInformation.familyName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-100 rounded dark:bg-gray-800 dark:text-blue"
              required
            />
          </div>
          <div>
            <label htmlFor="givenNames" className="block text-sm font-medium dark:text-white mb-1">
              Given Names
            </label>
            <input
              type="text"
              name="givenNames"
              id="givenNames"
              value={personInformation.givenNames}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-blue"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium dark:text-white mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={personInformation.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-blue"
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium dark:text-white mb-1">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={personInformation.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-blue"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium dark:text-white mb-1">
              Document Type
            </label>
            <select
              name="documentType"
              id="documentType"
              value={personInformation.documentType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-blue"
              required
            >
              <option value="">Select Document Type</option>
              <option value="passport">Passport</option>
              <option value="national_id">National ID</option>
            </select>
          </div>

          <div>
            <label htmlFor="documentNumber" className="block text-sm font-medium dark:text-white mb-1">
              Document Number
            </label>
            <input
              type="text"
              name="documentNumber"
              id="documentNumber"
              value={personInformation.documentNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-blue"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="documentExpiryDate" className="block text-sm font-medium dark:text-white mb-1">
              Document Expiry Date
            </label>
            <input
              type="date"
              name="documentExpiryDate"
              id="documentExpiryDate"
              value={personInformation.documentExpiryDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-blue"
              required
            />
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-medium dark:text-white mb-1">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              value={personInformation.nationality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-blue"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="documentIssuingBody" className="block text-sm font-medium dark:text-white mb-1">
            Document Issuing Body
          </label>
          <input
            type="text"
            name="documentIssuingBody"
            id="documentIssuingBody"
            value={personInformation.documentIssuingBody}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:text-white dark:text-blue"
            required
          />
        </div>

        <div className="mt-2">
          <p className="text-sm font-medium dark:text-white mb-3">Document Images (Optional)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="frontImage" className="block text-sm dark:text-white mb-1">
                Front of Document
              </label>
              <div className="flex items-center">
                <label className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 dark:border-gray-700 rounded cursor-pointer">
                  <input
                    type="file"
                    id="frontImage"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'front')}
                  />
                  <FiUpload className="mr-2 dark:text-blue" />
                  <span className="dark:text-white">
                    {documentImages.find((img) => img.label === 'front') ? 'Change Image' : 'Upload'}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="backImage" className="block text-sm dark:text-white mb-1">
                Back of Document
              </label>
              <div className="flex items-center">
                <label className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 dark:border-gray-700 rounded cursor-pointer">
                  <input
                    type="file"
                    id="backImage"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'back')}
                  />
                  <FiUpload className="mr-2 dark:text-white" />
                  <span className="dark:text-white">
                    {documentImages.find((img) => img.label === 'back') ? 'Change Image' : 'Upload'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
