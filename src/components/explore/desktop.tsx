

// if (isDesktop) {
// return (
// 	<>
<div className="flex gap-2 h-[calc(100vh-65px)]">
	{/*
					<section className="  p-4  flex-none  w-1/3  max-w-[550px]">
						<div className=" ">
							<div className="px-4 ">
								<div>
									<input
										type="text"
										value={filters.searchText}
										onChange={(e) =>
											setFilters(
												produce((draft) => {
													draft.searchText = e.target.value;
												})
											)
										}
										// onChange={filterWithSearch}
										placeholder="What are you looking for?"
										className="placeholder placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 "
									/>
								</div>
								<div>
									<Select
										value={filters.category}
										onValueChange={(value) =>
											setFilters(
												produce((draft) => {
													draft.category = value;
												})
											)
										}
									>
										<div className="focus:border-b-emerald-600 border-b pb-2">
											<SelectTrigger className="w-full border-none font-semibold cursor-pointer">
												<div className="text-left">
													<h3 className="font-normal">Categories</h3>
													<SelectValue placeholder="" />
												</div>
											</SelectTrigger>
										</div>
										<SelectContent side="bottom">
											<div>
												{categoriesList.map((_, index) => (
													<div key={index}>
														<SelectItem
															value={categoriesList[index]}
															key={index}
														>
															{categoriesList[index]}
														</SelectItem>
													</div>
												))}
											</div>
										</SelectContent>
									</Select>
								</div>
								<div className="flex justify-between items-center">
									<input
										type="text"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										placeholder="Where to look?"
										className="placeholder:font-normal placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 font-semibold"
									/>
									<RiUserLocationLine
										onClick={handleLocationAccess}
										className="h-5 w-5 mb-3.5 hover:opacity-25"
									/>
								</div>
								<div className="mb-4">
									{address && (
										<div>
											<h3 className=" mb-2">{`Proximity ${filters.proximity}km`}</h3>
											<Slider
												defaultValue={[40]}
												className="bg-emerald-600"
												max={40}
												onValueChange={(v) => {
													setFilters(
														produce((draft) => {
															draft.proximity = v;
														})
													);
												}}
											/>
										</div>
									)}
								</div>
								<div className="mb-4">
									<h2 className="mb-2">Features</h2>
									{tagList.map((tag, index) => (
										<div className="flex gap-2" key={index}>
											<input
												value={tag}
												onClick={() =>
													filters.tags.includes(tag)
														? setFilters(
															produce((draft) => {
																draft.tags.splice(
																	draft.tags.indexOf(tag),
																	1
																);
															})
														)
														: setFilters(
															produce((draft) => {
																draft.tags.push(tag);
															})
														)
												}
												className={`h-8 w-8 mb-2 peer:checked:black`}
												checked={filters.tags.includes(tag)}
												onChange={(e) => { }}
												type="checkbox"
											/>
											{tag}
										</div>
									))}
								</div>

								<div>
									<Select
										value={filters.orderBy}
										onValueChange={(value) =>
											setFilters(
												produce((draft) => {
													draft.orderBy = value;
												})
											)
										}
									>
										<div className="focus:border-b-emerald-600 border-b pb-2">
											<SelectTrigger className="w-full border-none font-semibold cursor-pointer">
												<div className="text-left">
													<h3 className="font-normal">Order By</h3>
													<SelectValue placeholder="" />
												</div>
											</SelectTrigger>
										</div>
										<SelectContent side="bottom">
											<div>
												{["Latest", "Random", "A-Z"].map((filter, index) => (
													<div key={index}>
														<SelectItem value={filter} key={index}>
															{filter}
														</SelectItem>
													</div>
												))}
											</div>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className=" flex flex-col justify-center items-center gap-3">
								<Button
									onClick={applyFilter}
									className=" bg-emerald-600 hover:bg-emerald-800 rounded-md basis-4/5 px-2 w-full p-4"
								>
									<Search /> Search
								</Button>
								<FilterSpinner
									clearFilters={clearFilters}
									isSpinning={isSpinning}
									setIsSpinning={setIsSpinning}
									label="Reset Filters"
								/>
							</div>
						</div>
					</section>
					*/}
	{/*
					<section className="bg-[#f4f4f4] border-2 p-4 flex-none w-1/3 max-w-[550px]  flex flex-col">
						{filteredListings.length > 0 ? (
							<div className="overflow-y-auto flex-1">
								<ListingList
									listings={filteredListings}
									className="grid gap-4"
								/>
							</div>
						) : (
							<div className="col-span-full py-12 text-center">
								<div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
									<Search className="h-12 w-12 text-gray-300" />
								</div>
								<h3 className="text-xl font-semibold mb-2">
									No businesses found
								</h3>
								<p className="text-gray-500 mb-4">
									We could not find any businesses matching your search criteria.
								</p>
								<Button
									variant="outline"
									className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
									onClick={clearFilters}
								>
									Clear All Filters
								</Button>
							</div>
						)}
					</section>
				*/}
	{/*
				<section className=" flex-auto overflow-hidden ">
					<MapView
						positions={getArrOfCoordinates()}
						filteredListings={filteredListings}
					/>
				</section>
				*/}
</div>
// </>
