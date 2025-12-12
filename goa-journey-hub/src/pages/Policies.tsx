import React from "react";

const Policies = () => {
  return (
    <div className="px-4 md:px-20 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center">
        Policies
      </h1>

      {/* Container Box */}
      <div className="bg-white shadow-md rounded-xl p-6 md:p-10 space-y-16">

        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Privacy Policy
          </h2>

          <p className="mb-4">
            Goa Yatra Holiday is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our website,
            mobile app, or travel services.
          </p>

          <p className="mb-4">
            We ensure that all customer information is stored securely and is
            never shared with any third party without your consent, except when
            required by law. Your data is used only to improve our services and
            deliver a better travel experience.
          </p>

          <p className="mb-4">
            By using our services, you agree to the terms outlined in this
            Privacy Policy.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-300"></div>

        {/* Cancellation Policy */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Cancellation Policy
          </h2>

          <p className="mb-4">
            All bookings made with Goa Yatra Holiday are <b>Non-Refundable</b>{" "}
            and <b>Non-Cancellable</b>.
          </p>

          <p className="mb-4">
            Once a booking is confirmed, it cannot be cancelled under any
            circumstance. Please verify all details before making your booking.
          </p>

          <p>
            For any assistance, you may contact our support team, and we will do
            our best to help within policy guidelines.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Policies;
