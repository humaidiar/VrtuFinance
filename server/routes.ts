import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculatorFormSchema, insertLeadSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Calculator API endpoint for performing Diminishing Musharaka calculations
  app.post("/api/calculate", async (req, res) => {
    try {
      // Validate the input data
      const formData = calculatorFormSchema.parse(req.body);
      
      // Perform the calculation
      const result = calculateDiminishingMusharaka(formData);
      
      // Return the calculation results
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      } else {
        console.error("Calculation error:", error);
        res.status(500).json({ message: "Error performing calculation" });
      }
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the lead data
      const leadData = insertLeadSchema.parse(req.body);
      
      // Store the lead in our storage
      await storage.createLead(leadData);
      
      // Return success
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({ message: "Error submitting contact form" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Function to calculate Diminishing Musharaka financing
function calculateDiminishingMusharaka(formData: z.infer<typeof calculatorFormSchema>) {
  const {
    propertyPrice,
    depositAmount,
    term,
    appreciationRate = 3,
    propertyType = 'existing',
    bedroomCount = 3,
    hasBuilderReport = false
  } = formData;

  // Calculate initial ownership percentage
  const initialOwnershipPercentage = (depositAmount / propertyPrice) * 100;
  
  // Calculate financed amount (Vrtu's share)
  const financedAmount = propertyPrice - depositAmount;
  
  // Base markup (profit rate)
  let markup = 1.3; // 30% markup as default
  
  // Adjust markup based on property type and other factors
  if (propertyType === 'apartment') {
    markup += 0.02; // Higher risk for apartments
  } else if (propertyType === 'new-construction') {
    markup -= 0.02; // Lower risk for new construction
  }
  
  // Adjust markup based on bedroom count (family homes may be more stable investments)
  if (bedroomCount >= 3 && bedroomCount <= 4) {
    markup -= 0.01; // Slight reduction for family-sized homes (3-4 bedrooms)
  } else if (bedroomCount > 4) {
    markup += 0.01; // Slight increase for very large homes (may be harder to sell)
  }
  
  // Adjust markup based on builder's report
  if (hasBuilderReport) {
    markup -= 0.02; // Reduced risk with verified property condition
  }
  
  // Ensure the markup stays within reasonable bounds
  markup = Math.max(1.2, Math.min(1.4, markup));
  
  const vrtuShareWithMarkup = financedAmount * markup;
  
  // Calculate monthly acquisition payment (to purchase Vrtu's share)
  const monthlyAcquisition = vrtuShareWithMarkup / (term * 12);
  
  // Annual rental rate (percentage of remaining Vrtu share)
  const annualRentalRate = 0.04; // 4%
  
  // Generate yearly breakdown data
  const yearlyBreakdown = [];
  let totalRentPaid = 0;
  let totalSharesPurchased = 0;
  let fullOwnershipYears = term;
  
  // Calculate initial values
  const initialCustomerShare = depositAmount;
  const initialProviderShare = financedAmount;
  const totalPropertyValue = propertyPrice;
  let customerOwnership = initialOwnershipPercentage / 100;
  let remainingProviderShare = vrtuShareWithMarkup;
  
  // Add year 0 (starting point)
  yearlyBreakdown.push({
    year: 0,
    customerOwnershipPercentage: initialOwnershipPercentage,
    weeklyPayment: 0,
    rentComponent: 0,
    shareComponent: 0,
    remainingProviderShare: vrtuShareWithMarkup,
  });
  
  // Calculate for remaining years
  for (let year = 1; year <= term; year++) {
    // Acquisition payment is fixed
    const yearlyAcquisition = monthlyAcquisition * 12;
    const weeklyAcquisition = yearlyAcquisition / 52;
    
    // Calculate rent based on remaining provider share and current ownership percentage
    const yearlyRental = remainingProviderShare * annualRentalRate;
    const weeklyRental = yearlyRental / 52;
    
    // Total weekly payment
    const weeklyPayment = weeklyRental + weeklyAcquisition;
    
    // Update provider share for this year (after previous year's payment)
    remainingProviderShare -= yearlyAcquisition;
    
    // Ensure non-negative values
    if (remainingProviderShare <= 0) {
      remainingProviderShare = 0;
      customerOwnership = 1;
      if (fullOwnershipYears === term) {
        fullOwnershipYears = year;
      }
    } else {
      // Update ownership percentage based on original financedAmount value
      customerOwnership = 1 - (remainingProviderShare / vrtuShareWithMarkup);
    }
    
    yearlyBreakdown.push({
      year,
      customerOwnershipPercentage: customerOwnership * 100,
      weeklyPayment,
      rentComponent: weeklyRental,
      shareComponent: weeklyAcquisition,
      remainingProviderShare,
    });
    
    // Update totals
    totalRentPaid += yearlyRental;
    totalSharesPurchased += yearlyAcquisition;
  }
  
  // Calculate monthly payment (total of both components)
  const monthlyPayment = (monthlyAcquisition + 
    ((vrtuShareWithMarkup * annualRentalRate) * (1 - (initialOwnershipPercentage / 100)) / 12));
  
  return {
    monthlyPayment,
    initialOwnershipPercentage,
    fullOwnershipYears,
    totalRentPaid,
    totalSharesPurchased,
    yearlyBreakdown,
    propertyDetails: {
      propertyType,
      bedroomCount,
      hasBuilderReport,
      propertyPrice,
      depositAmount,
      appliedMarkup: markup,
      appreciationRate
    }
  };
}
