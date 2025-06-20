"use client";

// import { useState } from "react";
// import toast from "react-hot-toast";

const CallToAction = () => {
  // const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <section
      id="call-section"
      className="relative z-10 overflow-hidden bg-primary-WHITE_DARK py-20 lg:py-[115px]"
    >
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[570px] text-center">
                <h2 className="mb-2.5 text-3xl font-bold text-secondary-GRAY md:text-[38px] md:leading-[1.44]">
                  <span>Experience Our AI Voice Agent</span>
                </h2>
                {/* <p className="text-secondary-LIGHT_GRAY mx-auto mb-6 max-w-[515px] text-base leading-[1.5]">
                  Enter your phone number to receive a call from our AI agent,
                  or click below to call us directly.
                </p> */}{" "}
                <p className="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-secondary-LIGHT_GRAY">
                  Click below to call our AI voice agent directly.
                </p>
                {/* <div className="mt-4">
                  <input
                    type="tel"
                    id="clientNumber"
                    placeholder="Enter your phone number"
                    className="w-64 rounded-md border border-secondary-LIGHT_GRAY bg-transparent px-4 py-2 mb-2 text-secondary-LIGHT_GRAY focus:outline-none focus:ring-2 focus:ring-offset-secondary-LIGHT_GRAY"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <button
                    className="bg-accent-BLUE text-primary-WHITE  hover:bg-secondary-LIGHT_GRAY ml-2 mt-2 rounded-md px-4 py-2 shadow-1 transition duration-300 ease-in-out "
                    onClick={async () => {
                      if (phoneNumber) {
                        try {
                          const response = await fetch(
                            "https://api.retellai.com/v2/create-phone-call",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_RETELL_API_KEY}`,
                              },
                              body: JSON.stringify({
                                call_id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                                call_type: "phone_call",
                                agent_id:
                                  process.env.NEXT_PUBLIC_RETELL_AGENT_ID ||
                                  "agent_00000000",
                                retell_llm_dynamic_variables: {},
                                call_status: "registered",
                                latency: {},
                                call_cost: {
                                  product_costs: [],
                                  total_duration_seconds: 0,
                                  total_duration_unit_price: 0,
                                  combined_cost: 0,
                                },
                                opt_out_sensitive_data_storage: false,
                                opt_in_signed_url: false,
                                from_number:
                                  process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER,
                                to_number: phoneNumber,
                                direction: "outbound",
                              }),
                            },
                          );

                          if (!response.ok) {
                            throw new Error("Failed to initiate call");
                          }

                          await response.json();
                          toast.success("Call initiated successfully!");
                        } catch (error) {
                          console.error("Error making call:", error);
                          toast.error(
                            "Failed to initiate call. Please try again.",
                          );
                        }
                      } else {
                        window.location.href = `tel:${process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER || "+37128816633"}`;
                      }
                    }}
                  >
                    {phoneNumber ? "Call Me" : "Call Agent"}
                  </button>
                </div> */}
                <div className="my-6">
                  <a
                    className="rounded-md bg-accent-BLUE px-8 py-4 text-primary-WHITE shadow-1 transition duration-300 ease-in-out hover:bg-secondary-LIGHT_GRAY xs:h-8 xs:px-2 xs:text-xs xl:h-12 xl:px-6 xl:text-[20px]"
                    href={`tel:${process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER || "+37128816633"}`}
                  >
                    Call Agent
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none">
        <span className="absolute left-0 top-0">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="12"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="13"
            />
          </svg>
        </span>
      </div>
    </section>
  );
};

export default CallToAction;
