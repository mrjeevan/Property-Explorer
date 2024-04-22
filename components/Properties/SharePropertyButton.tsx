import Property from "@/models/Property";
import { IProperty } from "@/types/property";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

type Props = { property: IProperty };

export default function SharePropertyButtons({ property }: Props) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          // quote={property.name}
          name={property.name}
          hashtag={`#${property.type}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          // quote={property.name}
          name={property.name}
          hashtags={[`${property.type}ForRent`]}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          // quote={property.name}
          name={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          // quote={property.name}
          subject={property.name}
          body={`Check out this property ${shareUrl}`}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
}
