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
    appreciationRate = 3,
    propertyType = 'existing',
    bedroomCount = 3,
    hasBuilderReport = false,
    additionalSharePayment = 0
  } = formData;
  
  // Use a standard term of 30 years for baseline calculation
  const standardTerm = 30;

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
  
  // Calculate provider's share with markup
  const providerShareWithMarkup = financedAmount * markup;
  
  // Annual rental rate (percentage of remaining provider share)
  const annualRentalRate = 0.04; // 4%
  
  // Generate yearly breakdown data
  const yearlyBreakdown = [];
  let totalRentPaid = 0;
  let totalSharesPurchased = 0;
  let fullOwnershipYears = standardTerm;
  
  // Initial values
  let customerOwnershipPercentage = initialOwnershipPercentage;
  let remainingProviderShare = providerShareWithMarkup;
  
  // Add year 0 (starting point)
  const initialWeeklyRental = (remainingProviderShare * annualRentalRate) / 52;
  
  yearlyBreakdown.push({
    year: 0,
    customerOwnershipPercentage: customerOwnershipPercentage,
    weeklyPayment: initialWeeklyRental,
    rentComponent: initialWeeklyRental,
    shareComponent: 0, // No share payment at the beginning
    remainingProviderShare: remainingProviderShare,
  });
  
  // Calculate for each subsequent year - use up to 50 years as maximum calculation period
  for (let year = 1; year <= 50; year++) {
    // Calculate standard annual share payment (based on standard term)
    const standardAnnualShare = providerShareWithMarkup / standardTerm;
    
    // Add any additional share payment
    const totalAnnualSharePayment = standardAnnualShare + additionalSharePayment;
    const weeklySharePayment = totalAnnualSharePayment / 52;
    
    // Calculate rent based on remaining provider share (uses previous year's ownership)
    const weeklyRental = (remainingProviderShare * annualRentalRate) / 52;
    
    // Total weekly payment
    const weeklyPayment = weeklyRental + weeklySharePayment;
    
    // Update remaining provider share after this year's payment
    remainingProviderShare -= totalAnnualSharePayment;
    
    // Ensure we don't go negative
    if (remainingProviderShare < 0) {
      remainingProviderShare = 0;
    }
    
    // Update customer ownership percentage
    customerOwnershipPercentage = ((propertyPrice - remainingProviderShare / markup) / propertyPrice) * 100;
    
    // Cap at 100%
    if (customerOwnershipPercentage > 100) {
      customerOwnershipPercentage = 100;
    }
    
    // Check if we've reached full ownership this year
    if (remainingProviderShare === 0 && fullOwnershipYears === standardTerm) {
      fullOwnershipYears = year;
    }
    
    yearlyBreakdown.push({
      year,
      customerOwnershipPercentage,
      weeklyPayment,
      rentComponent: weeklyRental,
      shareComponent: weeklySharePayment,
      remainingProviderShare,
    });
    
    // Update totals
    totalRentPaid += weeklyRental * 52;
    totalSharesPurchased += totalAnnualSharePayment;
    
    // If we've reached full ownership, no need to continue
    if (remainingProviderShare === 0) {
      break;
    }
  }
  
  // Calculate the monthly payment - needs to reflect additional payments!
  const standardMonthlySharePayment = providerShareWithMarkup / standardTerm / 12;
  const additionalMonthlySharePayment = additionalSharePayment / 12;
  const totalMonthlySharePayment = standardMonthlySharePayment + additionalMonthlySharePayment;
  
  // Calculate initial rent based on initial ownership
  const initialMonthlyRental = (providerShareWithMarkup * annualRentalRate * (1 - (initialOwnershipPercentage / 100))) / 12;
  
  // Total monthly payment combines both components
  const monthlyPayment = initialMonthlyRental + totalMonthlySharePayment;
  
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
