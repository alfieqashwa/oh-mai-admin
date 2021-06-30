import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr"
import { GlassHeader } from "components/glassHeader";
import { GlassDefault } from "components/glassDefault"
import { Header } from "components/header";
import { TitleWithBackButton } from "components/titleWithBackButton";

export default function AddPromocode() {
  return (
      <div className="pr-12 pl-7">
          <Header title="Products - Add Product" />

          {/* Discard Save Button Confirmation (??) on top of the page */}
          <GlassHeader title="unsaved promo code">
              <div className="flex space-x-4">
              <button className="px-2 py-2 text-sm uppercase md:px-4 text-N800 bg-N100">discard</button>
              <button className="px-5 py-2 text-sm uppercase md:px-6 bg-G400 text-N0">save</button>
              </div>
          </GlassHeader>

          {/* title */}
          <TitleWithBackButton path="/products/promo-code" title="add promo code" />
          
          <div className="flex justify-between mt-4 space-x-6">
            {/* LEFT-COL */}
            <div className="w-7/12">
              {/* promo-code */}
              <GlassDefault className="py-4 pl-4 pr-7">
                <p className="mt-0.5 capitalize text-N0 whitespace-nowrap">promo code</p>
                <div className="mt-2.5 flex justify-between items-center space-x-5">
                  <input type="text" name="promo-code" placeholder="Enter promo code" className="w-full rounded text-N0 bg-N200 bg-opacity-20 placeholder-N0 h-9" />
                  <button className="px-5 py-1 whitespace-nowrap text-N0 font-secondary">generate code</button>
                </div>
                <p className="mt-1 w350 text-N0 text-opacity-70 whitespace-nowrap">Your promo code must be unique. You can only enter up to 10 alphanumeric characters.</p>
                <textarea type="text" name="description" placeholder="Enter description (optional, for internal use only)" className="w-full mt-3 rounded h-28 text-N0 placeholder-N0 bg-N200 bg-opacity-20" /> 
              </GlassDefault>

              {/* usage-restriction */}
              <GlassDefault className="pt-6 pb-5 pl-4 mt-5 pr-7">
                <div>
                  <p className="capitalize text-N0 whitespace-nowrap">usage restriction</p>

                  <div className="flex items-center justify-between mt-1.5 space-x-9">
                    <div className="w-full">
                      <p className="capitalize w350">minimum spend</p>
                      <div className="relative mt-1">
                        <p className="absolute w350 inset-2">$</p>
                        <input type="number" name="min-spend" placeholder="0" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded pl-7 h-9 bg-N200 bg-opacity-20 placeholder-N0 text-N0" />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="capitalize w350">maximum spend</p>
                      <div className="relative mt-1">
                        <p className="absolute w350 inset-2">$</p>
                        <input type="number" name="max-spend" placeholder="0" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded pl-7 h-9 bg-N200 bg-opacity-20 placeholder-N0 text-N0" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <input type="checkbox" className="w-5 h-5 bg-transparent rounded border-N0" />
                      <p className="w350 text-N0">Promo code cannot be used in conjunction with other promo codes</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input type="checkbox" className="w-5 h-5 bg-transparent rounded border-N0" />
                      <p className="w350 text-N0">Promo code cannot be applied to items that are on sale</p>
                    </div>
                  </div>
                </div>

                <div>
                  {/* starts da-1st-row */}
                  {/* border */}
                  <div className="-mx-4 border mt-7 border-N0 border-opacity-30"></div>
                  <div className="flex items-center justify-between mt-5 space-x-9">
                    <div className="w-full">
                      <p className="w350 text-N0">Apply to Category</p>
                      <div className="mt-1.5">
                        <div className="relative">
                          <FiSearch className="absolute w-5 h-5 text-N0 inset-2" />
                          <input type="text" name="apply-to-category" placeholder="Enter a category and select" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded h-9 text-N0 pl-9 bg-N200 bg-opacity-20 placeholder-N0" />
                        </div>
                        <button className="flex justify-between items-center space-x-2.5 mt-3.5 bg-N200 rounded-full py-1.5 px-3.5 focus:outline-none focus:ring-2 ring-P700">
                          <p className="capitalize truncate w350 text-N800">Game Accessories</p>
                          <GrClose className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="w350 text-N0">Exclude Categories</p>
                      <div className="mt-1.5">
                        <div className="relative">
                          <FiSearch className="absolute w-5 h-5 text-N0 inset-2" />
                          <input type="text" name="exclude-categories" placeholder="Enter a category and select" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded h-9 text-N0 pl-9 bg-N200 bg-opacity-20 placeholder-N0" />
                        </div>
                        <button className="flex justify-between items-center space-x-2.5 mt-3.5 bg-N200 rounded-full py-1.5 px-3.5 focus:outline-none focus:ring-2 ring-P700">
                          <p className="capitalize truncate w350 text-N800">Games</p>
                          <GrClose className="w-3 h-3 font-bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ends da-1st-row */}

                  {/* starts da-2nd-row */}
                  {/* border */}
                  <div className="-mx-4 border mt-7 border-N0 border-opacity-30"></div>
                  <div className="flex items-center justify-between mt-5 space-x-9">
                    <div className="w-full">
                      <p className="w350 text-N0">Apply to Product</p>
                      <div className="mt-1.5">
                        <div className="relative">
                          <FiSearch className="absolute w-5 h-5 text-N0 inset-2" />
                          <input type="text" name="apply-to-product" placeholder="Enter a category and select" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded h-9 text-N0 pl-9 bg-N200 bg-opacity-20 placeholder-N0" />
                        </div>
                        <button className="flex justify-between items-center space-x-2.5 mt-3.5 bg-N200 rounded-full py-1.5 px-3.5 focus:outline-none focus:ring-2 ring-P700">
                          <p className="capitalize truncate w350 text-N800">Cyberpunk 2077...</p>
                          <GrClose className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="w350 text-N0">Exclude Products</p>
                      <div className="mt-1.5">
                        <div className="relative">
                          <FiSearch className="absolute w-5 h-5 text-N0 inset-2" />
                          <input type="text" name="exclude-products" placeholder="Enter a category and select" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded h-9 text-N0 pl-9 bg-N200 bg-opacity-20 placeholder-N0" />
                        </div>
                        <button className="flex justify-between items-center space-x-2.5 mt-3.5 bg-N200 rounded-full py-1.5 px-3.5 focus:outline-none focus:ring-2 ring-P700">
                          <p className="capitalize truncate w350 text-N800">Persona 5: PC Ed...</p>
                          <GrClose className="w-3 h-3 font-bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ends da-2nd-row */}


                  {/* starts da-3rd-row */}
                  {/* border */}
                  <div className="-mx-4 border mt-7 border-N0 border-opacity-30"></div>
                  <div className="flex items-center justify-between mt-5 space-x-9">
                    <div className="w-full">
                      <p className="w350 text-N0">Apply to KOL</p>
                      <div className="mt-1.5">
                        <div className="relative">
                          <FiSearch className="absolute w-5 h-5 text-N0 inset-2" />
                          <input type="text" name="apply-to-kol" placeholder="Enter a category and select" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded h-9 text-N0 pl-9 bg-N200 bg-opacity-20 placeholder-N0" />
                        </div>
                        <button className="flex justify-between items-center space-x-2.5 mt-3.5 bg-N200 rounded-full py-1.5 px-3.5 focus:outline-none focus:ring-2 ring-P700">
                          <p className="capitalize truncate w350 text-N800">Charlene Yue</p>
                          <GrClose className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="w350 text-N0">Exclude KOL</p>
                      <div className="mt-1.5">
                        <div className="relative">
                          <FiSearch className="absolute w-5 h-5 text-N0 inset-2" />
                          <input type="text" name="exclude-kol" placeholder="Enter a category and select" className="relative w-full pr-2 text-opacity-50 placeholder-opacity-50 rounded h-9 text-N0 pl-9 bg-N200 bg-opacity-20 placeholder-N0" />
                        </div>
                        <button className="flex justify-between items-center space-x-2.5 mt-3.5 bg-N200 rounded-full py-1.5 px-3.5 focus:outline-none focus:ring-2 ring-P700">
                          <p className="capitalize truncate w350 text-N800">Lice Wang</p>
                          <GrClose className="w-3 h-3 font-bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ends da-3rd-row */}
                </div>
              </GlassDefault>
            </div>

            {/* RIGHT-COL */}
            <div className="w-5/12">
              {/* promo-code-status */}
              <GlassDefault className="px-4 pt-4 pb-6">
                <p className="capitalize text-N0 font-secondary">promo code status</p>
                <select className="mt-3.5 w-full bg-opacity-20 bg-N200 text-N0 py-2 px-3.5 rounded">
                  <option>Draft</option>
                  <option>Draft-1</option>
                </select>
                <p className="mt-1.5 whitespace-no-wrap w350 text-N0 text-opacity-70">This promo code is a work in progress and cannot be used.</p>
              </GlassDefault>

              {/* promo-data */}
              <GlassDefault className="px-4 pt-4 mt-5 pb-9">
                <p className="capitalize text-N0">promo data</p>
                <div className="mt-3.5">
                  <p className="capitalize w350 whitespace-nowrap text-N0">discount type</p>
                  <select className="mt-1 w-full bg-opacity-20 bg-N200 text-N0 py-2 px-3.5 rounded">
                    <option>Percentage discount</option>
                    <option>Percentage discount-2</option>
                  </select>
                </div>
                <div className="mt-3.5">
                  <p className="capitalize w350 whitespace-nowrap text-N0">promo amount</p>
                  <input type="text" name="promo-amount" placeholder="Enter the total percentage discount" className="w-full mt-1 rounded bg-N200 bg-opacity-20 placeholder-N0 placeholder-opacity-70 text-N0 text-opacity-70" />
                </div>
                <div className="flex items-center mt-5 space-x-4">
                  <input type="checkbox" name="free-shipping" className="w-5 h-5 bg-transparent rounded border-N0" />
                  <p className="text-N0 w350 whitespace-nowrap">Enable free shipping</p>
                </div>

                {/* border */}
                <div className="mt-6 -mx-4 border border-N0 border-opacity-30"></div>

                <div className="flex justify-between items-center space-x-8 mt-3.5">
                  <div className="w-1/2">
                    <p className="capitalize text-N0 w350 whitespace-nowrap">start date</p>
                    <input type="text" name="start-date" placeholder="DD/MM/YYYY HH:MM" className="w-full py-2 mt-1 text-sm rounded font-secondary bg-N200 bg-opacity-20 placeholder-N0 placeholder-opacity-70 text-N0 text-opacity-70" />
                  </div>
                  <div className="w-1/2">
                    <p className="capitalize text-N0 w350 whitespace-nowrap">end date</p>
                    <input type="text" name="end-date" placeholder="DD/MM/YYYY HH:MM" className="w-full py-2 mt-1 text-sm rounded font-secondary bg-N200 bg-opacity-20 placeholder-N0 placeholder-opacity-70 text-N0 text-opacity-70" />
                  </div>
                </div>
              </GlassDefault>

              {/* usage-limits */}
              <GlassDefault className="px-4 pt-4 pb-6 mt-5">
                <p className="capitalize text-N0">usage limits</p>
                <div className="mt-3.5">
                  <p className="capitalize w350 whitespace-nowrap text-N0">quantity</p>
                  <input type="number" name="quantity" placeholder="0" className="w-full mt-1 rounded bg-N200 bg-opacity-20 text-N0 text-opacity-70 placeholder-N0 placeholder-opacity-70" />
                  <p className="text-N0 w350 text-opacity-70">This indicates how many times a promo code can be used by all customers before being invalid</p>
                </div>
                <div className="mt-4">
                  <p className="capitalize w350 whitespace-nowrap text-N0">Usage limits per user</p>
                  <input type="number" name="usage-limits-per-user" placeholder="0" className="w-full mt-1 rounded bg-N200 bg-opacity-20 text-N0 text-opacity-70 placeholder-N0 placeholder-opacity-70" />
                  <p className="text-N0 w350 text-opacity-70">This indicates how many times a promo code can be used by a single user before being invalid</p>
                </div>
              </GlassDefault>
            </div>
          </div>
      </div>
  )
}