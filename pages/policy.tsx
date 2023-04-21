import {
  Box,
  List,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NextPageWithLayout } from '../types';

const PolicyPage: NextPageWithLayout = () => {
  return (
    <PageWrapper>
      <Title sx={{ textAlign: 'center' }}>Peer Supply, Inc.</Title>
      <Subheader>Website Privacy Policy</Subheader>
      <ListSection>
        <SectionHeader>A. Introduction</SectionHeader>
        <SectionBody>
          Peer Supply, Inc. (“Company” or “We”) respect your privacy and are
          committed to protecting it through our compliance with this policy.
          <br></br>
          <br></br>
          This policy describes the types of information we may collect from you
          or that you may provide when you visit the website Peer.Supply or
          Peersupply.io (our “Website”) and our practices for collecting, using,
          maintaining, protecting, and disclosing that information.
          <br></br>
          <br></br>
          This policy applies to information we collect:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="On this website" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="When you interact with our advertising and applications on third-party websites and services, if those applications or advertising include links to this policy." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Messages between you and other organizations through the website or derived from the website." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Files uploaded to, shared with or downloaded from the website." />
          </ListItem>
        </List>
        <SectionBody>
          It does not apply to information collected by:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Us offline or through any other means, including on any other website operated by Company or any third party; or" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Any third party, including through any application or content (including advertising) that may link to or be accessible from or through the Website." />
          </ListItem>
        </List>
        <SectionBody>
          Please read this policy carefully to understand our policies and
          practices regarding your information and how we will treat it. If you
          do not agree with our policies and practices, your choice is not to
          use our Website. By accessing or using this Website, you agree to this
          privacy policy. This policy may change from time to time (see Changes
          to Our Privacy Policy). Your continued use of this Website after we
          make changes is deemed to be acceptance of those changes, so please
          check the policy periodically for updates.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>B. Children Under The Age of 16</SectionHeader>
        <SectionBody>
          Our Website is not intended for children under 16 years of age. No one
          under age 16 may provide any information to or on the Website. We do
          not knowingly collect personal information from children under 16. If
          you are under 16, do not use or provide any information on this
          Website or through any of its features or provide any information
          about yourself to us, including your name, address, telephone number,
          email address, or any screen name or user name you may use. If we
          learn we have collected or received personal information from a child
          under 16 without verification of parental consent, we will delete that
          information. If you believe we might have any information from or
          about a child under 16, please contact us at info@peersupply.co.
          <br></br>
          California residents under 16 years of age may have additional rights
          regarding the collection and sale of their personal information.
          Please see Your State Privacy Rights for more information.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>
          C. Information We Collect About You and How We Collect It
        </SectionHeader>
        <SectionBody>
          We collect several types of information from and about users of our
          Website, including information:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="By which you may be personally identified, such as name, postal address, email address, telephone number, or any other identifier by which you may be contacted online or offline (“personal information”);" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="That is about you but individually does not identify you, such as your employment, and any other information about you that might be included when you register for an account with the Website; and/or" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="About your internet connection, the equipment you use to access our Website, and usage details." />
          </ListItem>
        </List>
        <SectionBody>We collect this information:</SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Directly from you when you provide it to us." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses, and information collected through cookies, web beacons, and other tracking technologies." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="From third parties, for example, our business partners." />
          </ListItem>
        </List>
        <SectionBody>
          The information we collect on or through our Website may include:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Information that you provide by filling in forms on our Website. This includes information provided at the time of inquiring about or requesting our services. We may also ask you for information when you report a problem with our Website." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Records and copies of your correspondence (including email addresses), if you contact us." />
          </ListItem>
        </List>
        <SectionBody>
          As you navigate through and interact with our Website, we may use
          automatic data collection technologies to collect certain information
          about your equipment, browsing actions, and patterns, including:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Details of your visits to our Website, including traffic data, location data, logs, and other communication data and the resources that you access and use on the Website." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary=" Information about your computer and internet connection, including your IP address, operating system, and browser type." />
          </ListItem>
        </List>
        <SectionBody>
          The information we collect automatically may include personal
          information, but we may maintain it or associate it with personal
          information we collect in other ways or receive from third parties. It
          helps us to improve our Website and to deliver a better and more
          personalized service, including by enabling us to:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Estimate our audience size and usage patterns." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Store information about your preferences, allowing us to customize our Website according to your individual interests." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Speed up your searches." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Recognize you when you return to our Website." />
          </ListItem>
        </List>
        <SectionBody>
          The technologies we use for this automatic data collection may
          include:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText
              primary="Cookies (or browser cookies)"
              secondary="A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website."
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText
              primary="Web Beacons"
              secondary="Pages of our Website and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity)."
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText
              primary="Flash Cookies."
              secondary="Certain features of our Website may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from, and on our Website. Flash cookies are not managed by the same browser settings as are used for browser cookies. For information about managing your privacy and security settings for Flash cookies, see
Choices About How We Use and Disclose Your Information"
            />
          </ListItem>
        </List>
      </ListSection>
      <ListSection>
        <SectionHeader>D. How We Use Your Information</SectionHeader>
        <SectionBody>
          We use information that we collect about you or that you provide to
          us, including any personal information:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To present our Website and its contents to you." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To provide you with information, products, or services that you request from us." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To fulfill any other purpose for which you provide it." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To notify you about changes to our Website or any products or services we offer or provide though it." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="In any other way we may describe when you provide the information." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="For any other purpose with your consent." />
          </ListItem>
        </List>
      </ListSection>
      <ListSection>
        <SectionHeader>E. Disclosuree of Your Information</SectionHeader>
        <SectionBody>
          We may disclose aggregated information about our users, and
          information that does not identify any individual, without
          restriction. Any such aggregated and anonymous information is deemed
          our exclusive property and is not subject to the terms of this Privacy
          Policy.
          <br></br>
          <br></br>
          We may disclose personal information that we collect or you provide as
          described in this privacy policy:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To contractors, service providers, and other third parties we use to support our business and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Peer Supply, Inc.’s assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by Peer Supply, Inc. about our Website users is among the assets transferred." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To fulfill the purpose for which you provide it." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary=" For any other purpose disclosed by us when you provide the information." />
          </ListItem>
        </List>
        <SectionBody>
          We may also disclose your personal information:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To comply with any court order, law, or legal process, including to respond to any government or regulatory request." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To enforce any contract or other agreement between us and you." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Peer Supply, Inc., our customers, or others." />
          </ListItem>
        </List>
      </ListSection>
      <ListSection>
        <SectionHeader>
          F.Choices About How We Use and Disclose Your Information
        </SectionHeader>
        <SectionBody>
          We strive to provide you with choices regarding the personal
          information you provide to us. We have created mechanisms to provide
          you with the following control over your information:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText
              primary="Tracking Technologies and Advertising."
              secondary="You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. To learn how you can manage your Flash cookie settings, visit the Flash player settings page on Adobe’s website. If you disable or refuse cookies, please note that some parts of this site may then be inaccessible or not function properly."
            />
          </ListItem>
        </List>
        <SectionBody>
          Residents of certain states, such as California, Nevada, Colorado,
          Virginia, and Utah may have additional personal information rights and
          choices. Please see your State Privacy Rights for more information.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>
          G.Accessing and Correcting Your Information
        </SectionHeader>
        <SectionBody>
          You may send us an email at info@peersupply.co to request access to,
          correct or delete any personal information that you have provided to
          us. We may not accommodate a request to change information if we
          believe the change would violate any law or legal requirement or cause
          the information to be incorrect.
          <br></br>
          <br></br>
          Residents of certain states, such as California, Nevada, Colorado,
          Virginia, and Utah may have additional personal information rights and
          choices. Please see your State Privacy Rights for more information.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>H.Your State Privacy Rights</SectionHeader>
        <SectionBody>
          If you are a California, Nevada, Colorado, Virginia, or Utah resident,
          your state’s laws may provide you with additional rights regarding our
          use of your personal information. To learn more about your California
          privacy rights, please see Your California Privacy Rights.
          <br></br>
          <br></br>
          Colorado, Virginia and Utah each provide their state residents with
          rights to:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Confirm whether we process their personal information." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText
              primary="Access and delete certain personal information.
              Data portability."
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Opt-out of personal data processing for targeted advertising and sales." />
          </ListItem>
        </List>
        <SectionBody>
          Colorado and Virginia also provide their state residents with rights
          to:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Correct inaccuracies in their personal information, taking into account the information’s nature processing purpose." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Opt-out of profiling in furtherance of decisions that produce legal or similarly significant effects." />
          </ListItem>
        </List>
        <SectionBody>
          To exercise any of these rights please email us at info@peersupply.co.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>I. Your California Privacy Rights</SectionHeader>
        <SectionBody>
          This section supplements the information contained above and applies
          solely to all visitors, users, and others who reside in the State of
          California (“consumers” or “you”). We adopt this notice to comply with
          the California Consumer Privacy Act of 2018 (CCPA) and any terms
          defined in the CCPA have the same meaning when used in this Policy.
          <br></br>
          <br></br>
          This policy does not apply to workforce-related personal information
          collected from California-based employees, job applicants,
          contractors, or similar individuals.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>1. Information We Collect</SectionHeader>
        <SectionBody>
          We collect information that identifies, relates to, describes,
          references, is reasonably capable of being associated with, or could
          reasonably be linked, directly or indirectly, with a particular
          consumer, household, or device(“personal information”). Personal
          information does not include:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Publicly available information from government records." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Deidentified or aggregated consumer information." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Information excluded from the CCPA’s scope" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical Information Act (CMIA), clinical trial data, or other qualifying research data;" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="personal information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FCRA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver’s Privacy Protection Act of 1994." />
          </ListItem>
        </List>
        <SectionBody>
          In particular, we have collected the following categories of personal
          information from consumers within the last twelve (12) months:
        </SectionBody>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '90vw',
            marginTop: '24px',
          }}
        >
          <Table
            sx={{
              tableLayout: 'auto',
              width: '80vw',
              border: '2px black solid',
            }}
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ColumnLabel sx={{ fontWeight: '800' }}>Category</ColumnLabel>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ColumnLabel sx={{ fontWeight: '800' }}>Examples</ColumnLabel>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ColumnLabel sx={{ fontWeight: '800' }}>
                    Collected
                  </ColumnLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>A. Identifiers</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    A real name, alias, postal address, unique personal
                    identifier, online identifier, Internet Protocol address,
                    email address, account name, Social Security number,
                    driver’s license number, passport number, or other similar
                    identifiers.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Yes</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    B. Personal information categories listed in the California
                    Customer Records statute (Cal. Civ. Code § 1798.80(e)).
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    A name, signature, Social Security number, physical
                    characteristics or description, address, telephone number,
                    passport number, driver’s license or state identification
                    card number, insurance policy number, education, employment,
                    employment history, bank account number, credit card number,
                    debit card number, or any other financial information,
                    medical information, or health insurance information.
                    <br></br>
                    <br></br>
                    Some personal information included in this category may
                    overlap with other categories.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Yes</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    C. Protected classification characteristics under California
                    or federal law.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Age (40 years or older), race, color, ancestry, national
                    origin, citizenship, religion or creed, marital status,
                    medical condition, physical or mental disability, sex
                    (including gender, gender identity, gender expression,
                    pregnancy or childbirth and related medical conditions),
                    sexual orientation, veteran or military status, genetic
                    information (including familial genetic information).
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>No</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>D. Commercial information.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Records of personal property, products or services
                    purchased, obtained, or considered, or other purchasing or
                    consuming histories or tendencies.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Yes</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>E. Biometric information.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Genetic, physiological, behavioral, and biological
                    characteristics, or activity patterns used to extract a
                    template or other identifier or identifying information,
                    such as, fingerprints, faceprints, and voiceprints, iris or
                    retina scans, keystroke, gait, or other physical patterns,
                    and sleep, health, or exercise data.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>No</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    F. Internet or other similar network activity.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Browsing history, search history, information on a
                    consumer’s interaction with a website, application, or
                    advertisement.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Yes</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>G. Geolocation data.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Physical location or movements.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>No</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>H. Sensory data.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Audio, electronic, visual, thermal, olfactory, or similar
                    information.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>No</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    I. Professional or employment-related information.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Current or past job history or performance evaluations.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Yes</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    J. Non-public education information (per the Family
                    Educational Rights and Privacy Act (20 U.S.C. Section 1232g,
                    34 C.F.R. Part 99)).
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Education records directly related to a student maintained
                    by an educational institution or party acting on its behalf,
                    such as grades, transcripts, class lists, student schedules,
                    student identification codes, student financial information,
                    or student disciplinary records.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>No</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: '2px solid black' }}>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    K. Inferences drawn from other personal information.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Profile reflecting a person’s preferences, characteristics,
                    psychological trends, predispositions, behavior, attitudes,
                    intelligence, abilities, and aptitudes.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>No</ColumnLabel>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <SectionBody>
          We obtain the categories of personal information listed above from the
          following categories of sources:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Directly from you. For example, from forms you complete when registering for an account." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Indirectly from you. For example, from observing your actions on our Website." />
          </ListItem>
        </List>
      </ListSection>
      <ListSection>
        <SectionHeader>2. Use of Personal Information</SectionHeader>
        <SectionBody>
          We may use or disclose the personal information we collect for one or
          more of the following purposes:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To fulfill or meet the reason you provided the information. For example, if you share your name and contact information to ask a question about our products or services, we will use that personal information to respond to your inquiry." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To process your requests." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To provide you with support and to respond to your inquiries, including to investigate and address your concerns and monitor and improve our responses." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To personalize your Website experience and to deliver content and product and service offerings relevant to your interests." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To help maintain the safety, security, and integrity of our Website, products and services, databases and other technology assets, and business." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="For testing, research, analysis, and product development, including to develop and improve our Website, products, and services." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="As described to you when collecting your personal information or as otherwise set forth in the CCPA." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our consumers is among the assets transferred." />
          </ListItem>
        </List>
        <SectionBody>
          We will not collect additional categories of personal information or
          use the personal information we collected for materially different,
          unrelated, or incompatible purposes without providing you notice.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>3. Sharing Personal Information</SectionHeader>
        <SectionBody>
          We may share your personal information by disclosing it to a third
          party for a business purpose. We only make these business purpose
          disclosures under written contracts that describe the purposes,
          require the recipient to keep the personal information confidential,
          and prohibit using the disclosed information for any purpose except
          performing the contract. In the preceding twelve (12) months, Company
          has disclosed personal information for a business purpose to the
          categories of third parties indicated in the chart below.
          <br></br>
          <br></br>
          We do not sell personal information.
        </SectionBody>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '90vw',
            marginTop: '24px',
          }}
        >
          <Table
            sx={{
              tableLayout: 'auto',
              width: '80vw',
              border: '2px black solid',
            }}
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ColumnLabel sx={{ fontWeight: '800' }}>
                    Personal Information Category
                  </ColumnLabel>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ColumnLabel sx={{ fontWeight: '800' }}>
                    Business Purpose Disclosures
                  </ColumnLabel>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ColumnLabel sx={{ fontWeight: '800' }}>Sales</ColumnLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    B: California Customer Records personal information
                    categories.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Other Website users that access your profile on our Website
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    C: Protected classification characteristics under California
                    or federal law.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Not applicable (not collected)</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>D: Commercial information.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Other Website users that access your profile on our Website
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>E: Biometric information.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Not applicable (not collected)</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    F: Internet or other similar network activity.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>G: Geolocation data.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Not applicable (not collected)</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>H: Sensory data.</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Not applicable (not collected)</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    I: Professional or employment-related information.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>
                    Other Website users that access your profile on our Website
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    J: Non-public education information.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Not applicable (not collected)</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '25%' }}>
                  <ColumnLabel>
                    K: Inferences drawn from other personal information.
                  </ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>Not applicable (not collected)</ColumnLabel>
                </TableCell>
                <TableCell>
                  <ColumnLabel>None</ColumnLabel>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </ListSection>
      <ListSection>
        <SectionHeader>4. Your Rights and Choices</SectionHeader>
        <SectionBody>
          The CCPA provides consumers (California residents) with specific
          rights regarding their personal information. This section describes
          your CCPA rights and explains how to exercise those rights.
          <br></br>
          <br></br>
          Right to Know and Data Portability
          <br></br>
          <br></br>
          You have the right to request that we disclose certain information to
          you about our collection and use of your personal information over the
          past 12 months (the “right to know”). Once we receive your request and
          confirm your identity (see Exercising Your Rights to Know or Delete,
          we will disclose to you:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="The categories of personal information we collected about you." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="The categories of sources for the personal information we collected about you." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Our business or commercial purpose for collecting or selling that personal information." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="The categories of third parties with whom we share that personal information." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary=" If we sold or disclosed your personal information for a business purpose, two separate lists disclosing:" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="sales, identifying the personal information categories that each category of recipient purchased; and" />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="disclosures for a business purpose, identifying the personal information categories that each category of recipient obtained." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="The specific pieces of personal information we collected about you (also called a data portability request)." />
          </ListItem>
        </List>
        <SectionBody>
          We do not provide a right to know or data portability disclosure for
          B2B personal information.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>5. Right to Delete</SectionHeader>
        <SectionBody>
          You have the right to request that we delete any of your personal
          information that we collected from you and retained, subject to
          certain exceptions (the “right to delete”). Once we receive your
          request and confirm your identity (see Exercising Your Rights to Know
          or Delete ), we will review your request to see if an exception
          allowing us to retain the information applies. We may deny your
          deletion request if retaining the information is necessary for us or
          our service provider(s) to:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem>
            <ListItemText primary="1.Complete the transaction for which we collected the personal information, provide a good or service that you requested, take actions reasonably anticipated within the context of our ongoing business relationship with you, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, or otherwise perform our contract with you." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities." />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Debug products to identify and repair errors that impair existing intended functionality." />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law." />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Comply with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.)." />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when the information’s deletion may likely render impossible or seriously impair the research’s achievement, if you previously provided informed consent." />
          </ListItem>
          <ListItem>
            <ListItemText primary="7. Enable solely internal uses that are reasonably aligned with consumer expectations based on your relationship with us." />
          </ListItem>
          <ListItem>
            <ListItemText primary="8. Comply with a legal obligation." />
          </ListItem>
          <ListItem>
            <ListItemText primary="9. Make other internal and lawful uses of that information that are compatible with the context in which you provided it." />
          </ListItem>
        </List>
        <SectionBody>
          We will delete or deidentify personal information not subject to one
          of these exceptions from our records and will direct our service
          providers to take similar action.
          <br></br>
          <br></br>
          We do not provide these deletion rights for B2B personal information.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>
          6. Exercising Your Rights to Know or Delete
        </SectionHeader>
        <SectionBody>
          To exercise your rights to know or delete described above, please
          submit a request by emailing us at info@peersupply.co
          <br></br>
          <br></br>
          Only you, or someone legally authorized to act on your behalf, may
          make a request to know or delete related to your personal information.
          <br></br>
          <br></br>
          You may only submit a request to know twice within a 12-month period.
          Your request to know or delete must:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal information or an authorized representative." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it." />
          </ListItem>
        </List>
        <SectionBody>
          We cannot respond to your request or provide you with personal
          information if we cannot verify your identity or authority to make the
          request and confirm the personal information relates to you.
          <br></br>
          <br></br>
          You do not need to create an account with us to submit a request to
          know or delete.
          <br></br>
          <br></br>
          We will only use personal information provided in the request to
          verify the requestor’s identity or authority to make it.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>7. Response Timing and Formatting</SectionHeader>
        <SectionBody>
          We will confirm receipt of your request within ten (10) business days.
          If you do not receive confirmation within the 10-day timeframe, please
          contact us at info@peersupply.co.
          <br></br>
          <br></br>
          We endeavor to substantively respond to a verifiable consumer request
          within forty-five (45) days of its receipt. If we require more time
          (up to another 45 days), we will inform you of the reason and
          extension period in writing.
          <br></br>
          <br></br>
          Any disclosures we provide will only cover the 12-month period
          preceding our receipt of your request. The response we provide will
          also explain the reasons we cannot comply with a request, if
          applicable. For data portability requests, we will select a format to
          provide your personal information that is readily useable and should
          allow you to transmit the information from one entity to another
          entity without hindrance.
          <br></br>
          <br></br>
          We do not charge a fee to process or respond to your verifiable
          consumer request unless it is excessive, repetitive, or manifestly
          unfounded. If we determine that the request warrants a fee, we will
          tell you why we made that decision and provide you with a cost
          estimate before completing your request.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>8. Non-Discrimination</SectionHeader>
        <SectionBody>
          We will not discriminate against you for exercising any of your CCPA
          rights. Unless permitted by the CCPA, we will not:
        </SectionBody>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Deny you goods or services." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Provide you a different level or quality of goods or services." />
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText primary="Suggest that you may receive a different price or rate for goods or services or a different level or quality of goods or services." />
          </ListItem>
        </List>
      </ListSection>
      <ListSection>
        <SectionHeader>J. Data Security</SectionHeader>
        <SectionBody>
          We have implemented measures designed to secure your personal
          information from accidental loss and from unauthorized access, use,
          alteration, and disclosure.
          <br></br>
          <br></br>
          Unfortunately, the transmission of information via the internet is not
          completely secure. Although we do our best to protect your personal
          information, we cannot guarantee the security of your personal
          information transmitted to our Website. Any transmission of personal
          information is at your own risk. We are not responsible for
          circumvention of any privacy settings or security measures contained
          on the Website.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>K. Changes to Our Privacy Policy</SectionHeader>
        <SectionBody>
          It is our policy to post any changes we make to our privacy policy on
          this page. If we make material changes to how we treat our users’
          personal information, we will notify you through a notice on the
          Website home page. The date the privacy policy was last revised is
          identified at the top of the page. You are responsible for
          periodically visiting our Website and this privacy policy to check for
          any changes.
        </SectionBody>
      </ListSection>
      <ListSection>
        <SectionHeader>L. Contact Information</SectionHeader>
        <SectionBody>
          To ask questions or comment about this privacy policy and our privacy
          practices, contact us By email: info@peersupply.co
        </SectionBody>
      </ListSection>
    </PageWrapper>
  );
};

PolicyPage.getLayout = (page) => page;

export default PolicyPage;

const PageWrapper = styled(Box)({
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '24px',
  padding: '24px 100px',
});

const ListSection = styled(Box)({});

const Title = styled(Typography)({
  textAlign: 'center',
  font: 'Roboto',
  fontSize: '42px',
  fontWeight: '600',
});

const Subheader = styled(Typography)({
  marginTop: '24px',
  font: 'Roboto',
  fontSize: '32px',
  fontWeight: '400',
});

const SectionHeader = styled(Typography)({
  marginTop: '24px',
  font: 'Roboto',
  fontSize: '24px',
  fontWeight: '400',
});
const SectionBody = styled(Typography)({
  marginTop: '24px',
  font: 'Roboto',
  fontSize: '18px',
  fontWeight: '400',
});

const ColumnLabel = styled(Typography)({
  font: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '18px',
});
