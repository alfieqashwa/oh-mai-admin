import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiTrash } from 'react-icons/bi'
import { GlassDiv } from "components/glassdiv";
import { GlassDefault } from 'components/glassDefault'
import TextEditor from 'components/textEditor'
import { UploadMedia } from 'components/uploadMedia'

// Confirmation Saved-Button
export const ConfirmationSavedButton = () =>
  <GlassDefault className="fixed z-20 top-0 left-[252px] right-0 h-20 rounded-none">
    <div className="flex items-center justify-between p-4">
      <p className="w400">Unsaved product</p>
      <div className="mr-4 space-x-4">
        <button className="px-4 py-2 uppercase text-N800 bg-N100">discard</button>
        <button className="px-6 py-2 uppercase bg-G400 text-N0">save</button>
      </div>
    </div>
  </GlassDefault>

// Left
export const Title = () =>
  <GlassDefault className="p-4">
    <p className="w400">Title</p>
    <input className="w-full mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="title" id="title" placeholder="Enter title here" />
    <p className="mt-6 w400">Description</p>
    <GlassDiv className="mt-1 rounded-none"><TextEditor /></GlassDiv>
  </GlassDefault>

export const Media = () =>
  <GlassDefault className="p-4">
    <p className="w400">Media</p>
    <div>
      <UploadMedia />
    </div>
  </GlassDefault>

export const ProductVariants = () =>
  <GlassDefault className="p-4">
    <div className="flex items-center justify-between">
      <p className="w400">Product Variants</p>
      <div className="space-x-4">
        <button className="px-4 py-2 text-sm text-N800 bg-N200">auto-generate</button>
        <button className="px-4 py-2 text-sm text-N0 bg-P900">add variants</button>
      </div>
    </div>
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center space-x-2">
        <h5 className="mr-1 text-base">1</h5>
        <p className="px-2 py-1 rounded-full w350 bg-N200 bg-opacity-20">Nintendo Switch</p>
        <p className="px-2 py-1 rounded-full w350 bg-N200 bg-opacity-20">Japanese</p>
      </div>
      <div className="flex items-center space-x-4 text-N0">
        <HiOutlinePencilAlt className="w-5 h-5" />
        <BiTrash className="w-5 h-5" />
      </div>
    </div>
  </GlassDefault>

// Right
export const ProductStatus = () =>
  <GlassDefault className="p-4">
    <p className="w400">Product Status</p>
    <select className="w-full mt-3 rounded-md text-N0 bg-opacity-20 bg-N200">
      <option>Active</option>
      <option>Inactive</option>
    </select>
    <p className="mt-2 w350">This product is available on OhMai and KOL stores.</p>
  </GlassDefault>

export const ProductType = () =>
  <GlassDefault className="p-4">
    <p className="w400">Product Type</p>
    <select className="w-full mt-3 rounded-md text-N0 bg-opacity-20 bg-N200">
      <option>Variable Product</option>
    </select>
    <p className="mt-2 w350">This product is available on OhMai and KOL stores.</p>
  </GlassDefault>

export const Inventory = () =>
  <GlassDefault className="p-4">
    <p className="w400">Inventory</p>
    <p className="mt-3 w350">SKU Number</p>
    <input className="w-full mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="sku" id="sku" placeholder="Enter SKU number here" />
    <div className="my-6 -mx-4 border border-N0 border-opacity-30"></div>
    <p className="mt-3 w350">Quantity</p>
    <input className="w-full mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="sku" id="sku" placeholder="Enter quantity here" />
  </GlassDefault>

export const Price = () =>
  <div>
    <GlassDefault className="p-4">
      <p className="w400">Price</p>
      <p className="mt-3 w350">Current Price</p>
      <input className="w-3/4 mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="sku" id="sku" placeholder="$" />
      <p className="mt-3 w350">Tax</p>
      <input className="w-3/4 mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="sku" id="sku" placeholder="%" />
      <div className="my-6 -mx-4 border border-N0 border-opacity-30"></div>
      <div className="flex items-center justify-start mt-3 space-x-2">
        <input type="checkbox" className="w-5 h-5 rounded bg-opacity-20 bg-N200" />
        <p className="w350">This product is on sale.</p>
      </div>
      <p className="mt-3 w350">Sale Price</p>
      <input className="w-full mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="sku" id="sku" placeholder="$" />
    </GlassDefault>
  </div>

export const Shipping = () =>
  <div>
    <GlassDefault className="p-4 rounded-b-none">
      <p className="w400">Shipping</p>
      <div className="flex items-center justify-start mt-3 space-x-2">
        <input type="checkbox" className="w-5 h-5 rounded bg-opacity-20 bg-N200" />
        <p className="w350">This is a physical product</p>
      </div>
      <div className="my-6 -mx-4 border border-N0 border-opacity-30"></div>
      <p className="w350">Weight</p>
      <p className="mt-2 w350">Shipping rates are automatically calculated at checkout and label prices.</p>
      <div className="flex mt-1 space-x-4">
        <input className="w-3/4 mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="weight" id="weight" placeholder="Enter weight up to 1 decimal point" />
        <select className="w-1/4 mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="sku" id="sku">
          <option>kg</option>
          <option>g</option>
        </select>
      </div>
      <div className="my-4 -mx-4 border border-N0 border-opacity-30"></div>
      <p className="w350">Customs Information</p>
      <p className="mt-2 w350">When shipping internationally, border officers use this to calculate duties. These are shown on customs forms you print during fulfillment.</p>
      <p className="mt-4 w350">Country of Origin</p>
      <select className="w-full mt-1 rounded-md text-N0 bg-opacity-20 bg-N200">
        <option>Select a country</option>
      </select>
      <p className="mt-4 w350">HS (Harmonised System) Code</p>
      <div className="relative flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-6 h-6 text-N0 left-3 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input className="w-full pl-12 mt-1 rounded-md text-N0 bg-opacity-20 bg-N200" type="text" name="sku" id="sku" placeholder="Search by product keyword or HS code" />
      </div>
    </GlassDefault>
  </div>