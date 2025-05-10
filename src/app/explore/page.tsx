import FilterListing from "@/components/explore/filter-listing";
import ListingList from "@/components/explore/listing-list";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Explore() {
  //   const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="w-full">
        {/* <h2 className="font-semibold text-2xl text-center my-4">
          Explore Listings
        </h2> */}
      </div>
      {/* // filter and search section */}
      <section className="my-4 px-4">
        <div className="flex justify-between">
          <div className="flex flex-row-reverse basis-2/3 justify-center items-center">
            <Input
              type="text"
              placeholder="What are you looking for?"
              className="border-none focus:outline-none  focus-visible:ring-0 placeholder:text-black "
            />
            <Search size={20} />
          </div>
          <FilterListing />
        </div>
      </section>
      <section className="bg-[#f4f4f4] h-screen px-4 ">
        {/* // card display */}
        <ListingList />
        {/* <ListingListWrapper /> */}
      </section>
      {/* TODO change the opacity of cover image on hover */}
    </div>
  );
}
