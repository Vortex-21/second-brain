import { Button } from "./Button";
import { Card } from "./Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useSetRecoilState } from "recoil";
import { ModalAtom } from "../recoil/atoms/ModalAtom";
export const AllNotes = () => {
  const setModalStatus = useSetRecoilState(ModalAtom);
  function addContent() {
    setModalStatus("Add");
  }

  function shareBrain() {
    setModalStatus("ShareBrain");
  }
  return (
    <div className="">
      <div className="sticky top-0 bg-[#F9FBFC] p-2">
      <div className="flex  items-center h-20">
        <h1 className="text-4xl">All Notes</h1>

        <div id="buttons" className="ml-auto text-2xl flex gap-5">
          <Button
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
            clickHandler={addContent}
          ></Button>
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
            clickHandler={shareBrain}
          ></Button>
        </div>
      </div>

      </div>

      <div id="cards" className="flex flex-wrap mt-8 gap-5 ">
        <Card
          content_type="Video"
          title="Rodan vs Jets"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://www.youtube.com/watch?v=KExBIzm1xQo"
        />

        <Card
          content_type="Tweet"
          title="Rodan vs Jets"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://twitter.com/username/status/1869311029131596262"
        />

        <Card
          content_type="Document"
          title="Rodan vs Jets"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://twitter.com/username/status/1869311029131596262"
        />

        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />

        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />

        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />
        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />
        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />
        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />
        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />
        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />
        <Card
          content_type="Tweet"
          title="Twitter post"
          description="In Godzilla: King of Monsters, Rodan a flying fiery titan, is destroying the jets which were sent to fight Monster-0 otherwise known as King Ghidora!"
          tags={["Action", "Legendary", "Monsters"]}
          link="https://x.com/elonmusk/status/1869865296376303763"
        />
      </div>
    </div>
  );
};
