// // pages/api/create-linked-account.js

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { email, phone, legal_business_name, contact_name, upi_id } = req.body;

//   try {
//     const linkedAccount = await razorpay.accounts.create({
//       email,
//       phone,
//       type: 'route',
//       legal_business_name,
//       business_type: 'individual',
//       contact_name,
//       profile: {
//         category: 'freelancer',
//         subcategory: 'individual',
//         addresses: {
//           registered: {
//             street1: 'N/A',
//             city: 'N/A',
//             state: 'N/A',
//             postal_code: '000000',
//             country: 'IN',
//           },
//         },
//       },
//       legal_info: {
//         pan: 'XXXXX0000X', // Replace with actual PAN if available
//       },
//       notes: {
//         upi_id,
//       },
//     });

//     res.status(200).json({ success: true, linkedAccount });
//   } catch (error) {
//     console.error('Error creating linked account:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// }


// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     // Extract form data
//     const email = formData.get('email');
//     const phone = formData.get('phone');
//     const legal_business_name = formData.get('legal_business_name');
//     const contact_name = formData.get('contact_name');
//     const upi_id = formData.get('upi_id');

//     // Validate required fields
//     if (!email || !phone || !legal_business_name || !contact_name) {
//       return new Response(JSON.stringify({ error: 'Missing required fields' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Call Razorpay API to create a linked account
//     const linkedAccount = await razorpay.accounts.create({
//       email,
//       phone,
//       type: 'route',
//       legal_business_name,
//       business_type: 'individual',
//       contact_name,
//       profile: {
//         category: 'freelancer',
//         subcategory: 'individual',
//         addresses: {
//           registered: {
//             street1: 'N/A',
//             city: 'N/A',
//             state: 'N/A',
//             postal_code: '000000',
//             country: 'IN',
//           },
//         },
//       },
//       legal_info: {
//         pan: 'XXXXX0000X', // Replace with actual PAN if available
//       },
//       notes: {
//         upi_id,
//       },
//     });

//     return new Response(
//       JSON.stringify({ success: true, linkedAccount }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error('Error creating linked account:', error);
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }
// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(req) {
//   try {
//     const body = await req.json(); // Parse JSON from request body

//     const { email, phone, legal_business_name, contact_name, upi_id } = body;

//     // Validate required fields
//     if (!email || !phone || !legal_business_name || !contact_name) {
//       return new Response(JSON.stringify({ error: 'Missing required fields' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Call Razorpay API to create a linked account
//     const linkedAccount = await razorpay.accounts.create({
//       email,
//       phone,
//       type: 'route',
//       legal_business_name,
//       business_type: 'individual',
//       contact_name,
//       profile: {
//         category: 'freelancer',
//         subcategory: 'individual',
//         addresses: {
//           registered: {
//             street1: 'N/A',
//             city: 'N/A',
//             state: 'N/A',
//             postal_code: '000000',
//             country: 'IN',
//           },
//         },
//       },
//       legal_info: {
//         pan: 'XXXXX0000X', // Replace with actual PAN if available
//       },
//       notes: {
//         upi_id,
//       },
//     });

//     return new Response(
//       JSON.stringify({ success: true, linkedAccount }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error('Error creating linked account:', error);
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }


// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(req) {
//     try {
//       const body = await req.json();
  
//       const { email, phone, legal_business_name, contact_name, upi_id } = body;
  
//       // Validate required fields
//       if (!email || !phone || !legal_business_name || !contact_name) {
//         return new Response(JSON.stringify({ error: 'Missing required fields' }), {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         });
//       }
  
//       // Call Razorpay API to create a linked account
//       const linkedAccount = await razorpay.accounts.create({
//         email,
//         phone,
//         type: 'route',
//         legal_business_name,
//         business_type: 'individual',
//         contact_name,
//         profile: {
//           category: 'healthcare',
//           subcategory: 'clinic',
//           addresses: {
//             registered: {
//               street1: 'Bodla,Agra',
//               street2:"MG Road",
//               city: 'Agra',
//               state: 'Uttar Pradesh', // Update this with a valid state name
//               postal_code: '282010',
//               country: 'IN',
//             },
//           },
//         },
//         legal_info: {
//           pan: 'AAACL1234C', // Replace with actual PAN if available

         
//         },
//         notes: {
//           upi_id,
//         },
//       });
  
//       return new Response(
//         JSON.stringify({ success: true, linkedAccount }),
//         {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     } catch (error) {
//       console.error('Error creating linked account:', error);
//       return new Response(
//         JSON.stringify({ success: false, message: error.error.description }),
//         {
//           status: error.statusCode || 500,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }
//   }
  

import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    try {
      const body = await req.json();
  
      const { email, phone, legal_business_name, contact_name, upi_id, account_number, ifsc_code } = body;
  
      // Validate required fields
      if (!email || !phone || !legal_business_name || !contact_name || !account_number || !ifsc_code) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Call Razorpay API to create a linked account with bank details
      const linkedAccount = await razorpay.accounts.create({
        email,
        phone,
        type: 'route',
        legal_business_name,
        business_type: 'individual',
        contact_name,
        profile: {
          category: 'healthcare',
          subcategory: 'clinic',
          addresses: {
            registered: {
              street1: 'Bodla,Agra',
              street2: 'MG Road',
              city: 'Agra',
              state: 'Uttar Pradesh',
              postal_code: '282010',
              country: 'IN',
            },
          },
        },
        legal_info: {
          pan: 'AAACL1234C', // Replace with actual PAN if available
          bank_account: {
            account_number,  // Account number provided in request
            ifsc_code,       // IFSC code provided in request
            account_type: 'savings',  // Can be 'savings' or 'current'
          },
        },
        notes: {
          upi_id,
        },
      });
  
      return new Response(
        JSON.stringify({ success: true, linkedAccount }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error creating linked account:', error);
      return new Response(
        JSON.stringify({ success: false, message: error.error.description || 'An error occurred' }),
        {
          status: error.statusCode || 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
}
