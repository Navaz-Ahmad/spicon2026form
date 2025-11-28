import standaloneImg from "./images/491701.png";
import redundantImg from "./images/491701.png";
import redundent from "./images/491701.png";
import image from "./images/491698.png";
import stack from "./images/491722.png";
import stackedImg from "./images/491701.png";
import myimg from "./images/491698.png";
import images from "./images/491698.png";
import ether from "./images/491699.png";
import re from "./images/re.png";
import sta from "./images/491700.png";
import thirdpic from "./images/491700.png";
import thirdpic1 from "./images/491701.png";
import img491698 from "./images/491698.png";
import img491699 from "./images/491699.png";
import img491700 from "./images/491700.png";
import img491701 from "./images/491701.png";
import img491722 from "./images/491722.png";
import imgRe from "./images/491700.png";
import imgSta from "./images/491700.png";
import stand from "./images/stand.png";
import stp2p from "./images/491700.png";
import me from "./images/491704.png";
import step5pic from "./images/491702.png";
import step5eth from "./images/491703.png";
import step6p from "./images/491704.png";
import step6e from "./images/491705.png";
import step7p from "./images/491706.png";
import step7e from "./images/491707.png";
import ste1r from "./images/491709.png";
import ste2r from "./images/491710.png";
import step4p from "./images/491711.png";
import step4r from "./images/491712.png";
import step5p from "./images/491713.png";
import step5r from "./images/491714.png";
import ste6p from "./images/491715.png";
import ste6r from "./images/491716.png";
import ste7p from "./images/491717.png";
import ste7r from "./images/491718.png";
import ste8p from "./images/491719.png";
import ste8r from "./images/491720.png";
import stack1 from "./images/491723.png";
import stack2 from "./images/491724.png";
import stack3 from "./images/491725.png";
import stack4 from "./images/491726.png";

export const stepsData = [
  {
    id: 1,
    title: "Make a design choice",
    fullDesc: "Choose between Standalone, Redundant, or Stacked configuration",
    status: "pending",
    type: "designChoice",
    selectedOption: "",
    options: [
      {
        name: "Standalone",
        image: stand, // ✅ FIXED
        fullDesc:
          "Provides a single control-plane and data-plane. For example, a single C9350, or a C9610 with a single supervisor.The standalone design choice means a single point of failure at the device level. Subsequent steps in this sequence focus on mitigating this through network-level redundancy. This option lacks redundant control planes and internal hardware redundancy.",
        flow: "standalone",
      },
      {
        name: "Redundant",
        image: re, // ✅ FIXED
        fullDesc:
          "Provides an active control-plane with standby, and a single data-plane. For exmaple, a C9610 with dual supervisors. Critical components such as fans and power supply modules are duplicated to prevent single points of failure.",
        flow: "redundant",
      },
      {
        name: "Stacked",
        image: stack, // ✅ FIXED
        fullDesc:
          "Provides an active control-plane with a standby and multiple data-planes. For example two  modular chassis (C9610) or a stack of fixed chassis (C9350). Critical components such as fans and power supply modules are also duplicated to prevent single points of failure.",
        flow: "stacked",
      },
    ],
  },
];

export const flows = {
  standalone: [
    {
      id: 2,
      title: "Select the link aggregation or protocol approach",
      subtitle:
        "Decide how physical links connecting the standalone device to other devices are managed for redundancy and load balancing. Choose between these available options:",
      status: "pending",
      type: "linkChoice",
      selectedOption: "",
      options: [
        {
          name: "Point-to-point (P2P) links",
          image: images,
          desc: "P2P links utilize individual physical cables between the standalone device and connected devices.",
          fullDesc:
            "P2P links utilize individual physical cables between the standalone device and connected devices.Recovery from cable failure relies on the routing protocol to find alternate paths. This choice relies on ECMP for load balancing and dynamic traffic diversion when a link or device fails. It does not provide any built-in redundancy in the control plane or data plane.",
        },
        {
          name: "EtherChannel links",
          image: ether,
          desc: "EtherChannels bundle multiple physical cables into a single logical link.",
          fullDesc: `
EtherChannels bundle multiple physical cables into a single logical link. 
A single cable failure reduces bandwidth but keeps the channel active, causing minimal topology changes for the network protocols.

This choice provides link-level redundancy and load balancing within the bundle, reducing the reliance on routing protocol convergence for single link failures.
`,
        },
      ],
    },
    {
      id: 3,
      title: "Seek alternatives to control- and data-plane redundancy",
      subtitle: "",
      fullDesc: {
        p2p: {
          text: `Since there is no internal device redundancy, reliance is on protocol-level recovery. Ensure multiple routed paths via ECMP and robust routing convergence. 
Ensure multiple routed paths via ECMP (traffic is dynamically load-balanced and diverted when a link or device fails), and routing convergence.`,
          image: stp2p,
        },
        ether: {
          text: `Since there is no internal device redundancy, reliance is on protocol-level recovery. Ensure multiple routed paths via ECMP and robust routing convergence. 
Ensure multiple routed paths via ECMP (traffic is dynamically load-balanced and diverted when a link or device fails), and routing convergence.`,
          image: thirdpic1,
        },
      },
      type: "info",
    },
    {
      id: 4,
      title: "Enhance failure detection",
      fullDesc: {
        p2p: {
          text: "The only resilience mechanism available for standalone devices is BFD. It speeds up convergence in standalone environments by enabling routing protocols (OSPF, EIGRP, BGP) to detect link failures more quickly. This acceleration allows for faster failover, improving reaction times beyond the default timers.",
          image: step5pic,
        },
        ether: {
          text: `The only resilience mechanism available for standalone devices is BFD. It speeds up convergence in standalone environments by enabling routing protocols (OSPF, EIGRP, BGP) to detect link failures more quickly. This acceleration allows for faster failover, improving reaction times beyond the default timers.`,
          image: step5eth,
        },
      },
      type: "info",
    },
    {
      id: 5,
      title: "Enable seamless gateway failover",
      fullDesc: {
        p2p: {
          text: `For gateway redundancy across multiple standalone Layer 3 devices, use protocols like HSRP or VRRP. 
These protocols enable devices to share a virtual IP and MAC address, presenting a single default gateway to end hosts. This shared virtual IP/MAC allows seamless failover if a device or link fails, ensuring resilient Layer 3 gateway redundancy in such deployments.`,
          image: step6p,
        },
        ether: {
          text: `For gateway redundancy across multiple standalone Layer 3 devices, use protocols like HSRP or VRRP. 
These protocols enable devices to share a virtual IP and MAC address, presenting a single default gateway to end hosts. This shared virtual IP/MAC allows seamless failover if a device or link fails, ensuring resilient Layer 3 gateway redundancy in such deployments.`,
          image: step6e,
        },
      },
      type: "info",
    },
    {
      id: 6,
      title: "Prepare for upgrade and maintenance",
      fullDesc: {
        p2p: {
          text: `Use GIR for traffic-safe hardware or path maintenance in ECMP-based networks. GIR works by adjusting protocol costs to remove a device from the active network topology during maintenance, effectively shifting traffic to alternative ECMP paths. 

When a standalone device uses P2P links,  this causes the network to stop using the individual P2P Layer 3 links connected to the device, shifting traffic to alternative ECMP paths through other devices. This approach ensures traffic continues flowing without disruption during maintenance and is especially effective in ECMP environments with multiple redundant paths.`,
          image: step7p,
        },
        ether: {
          text: `Use GIR for traffic-safe hardware or path maintenance in ECMP-based networks. GIR works by adjusting protocol costs to remove a device from the active network topology during maintenance, effectively shifting traffic to alternative ECMP paths.

When a standalone device uses an EtherChannel as its primary connection, GIR applies to the entire logical EtherChannel interface’s routing presence. Although EtherChannel provides internal link redundancy by bundling multiple physical links, GIR takes the whole device and its logical EtherChannel interface out of the active forwarding path for maintenance. This ensures that traffic is gracefully redirected without disruption while maintenance is performed.`,

          image: step7e,
        },
      },
      type: "info",
    },
    {
      id: 7,
      title: "Follow maintenance best practices",
      fullDesc: `Ensure controlled, minimal-impact maintenance and upgrades for standalone devices.

Due to the lack of internal redundancy, planned downtime is generally unavoidable for most maintenance related activites in a standalone setup.

          •	Software Maintenance Upgrades (SMUs): for applying critical patches without requiring full system reloads, reducing operational impact for minor updates.
          •	Software upgrades: need planned downtime with device reloads. Schedule them during maintenance windows; verify compatibility beforehand. 
         •	Rollbacks: require reboot and may need manual reconfiguration. Monitor closely to minimize downtime.

`,
      type: "info",
    },
  ],

  /* ----------------------------------
       REDUNDANT FLOW
  ---------------------------------- */
  redundant: [
    {
      id: 2,
      fullDesc: `When two compatible supervisors are installed and powered on, the Cisco IOS XE operating system automatically detects this redundant setup. It then automatically establishes the active and standby roles for the supervisors and initiates stateful synchronization of the control plane between them.

So SSO is built-in, synchronizing all interface, protocol (L2/L3, unicast/multicast/VRF), and configuration states with the secondary supervisor. This minimizes traffic impact during a supervisor switchover.`,
      title:
        "Synchronization between active and standby, built-in control plane redundancy",
      image: ste1r,
      type: "info",
    },
    {
      id: 3,
      title: "Extend SSO benefits to the network's neighbors",
      fullDesc: `Use NSF to enable neighbor devices to maintain their forwarding information and keep links active without triggering topology recalculations during a control-plane switchover.`,
      image: ste2r,
      type: "info",
    },
    {
      id: 4,
      title: "Select the link aggregation or protocol approach",
      type: "linkChoice",
      subtitle:
        "Decide how the redundant system connects to its neighbors for redundancy and load balancing. Choose from  the available options—both options benefit from NSF with SSO:",
      selectedOption: "",
      options: [
        {
          name: "Point-to-point (P2P) links",
          image: step4p,
          desc: "Direct cable communication between redundant units.",
          fullDesc: `P2P links utilize individual physical cables connecting devices, similar to a standalone environment. However, redundancy is achieved by deploying multiple such P2P links distributed across redundant hardware components, such as dual supervisor modules or line cards.
When you use P2P links as a link redundancy approach, if there is a failure, links remain online with no topology changes during a switchover because of NSF with SSO. While EtherChannels maintain the channel with reduced bandwidth if a link fails.
`,
        },
        {
          name: "EtherChannel links",
          image: step4r,
          desc: "Used for redundant, aggregated paths.",
          fullDesc: `When using EtherChannels as the link aggregation method, if one physical link in the bundle fails: 
      •  the channel keeps operating with reduced bandwidth and no changes to the network topology.  •	     
      •  traffic automatically shifts to the remaining active links without causing network reconvergence or disruption. 
The EtherChannel remains logically active as long as at least one member link is up, providing both bandwidth aggregation and link redundancy. This enhances network resilience by preventing topology changes and enabling seamless failover within the aggregated link group.

In contrast, standalone point-to-point links trigger routing protocol convergence and traffic diversion upon failure. With EtherChannels in a redundant setup, failover is faster and more transparent to the network. 
Do more: 
An extension to this option would be to use Distributed EtherChannel (DEC). This allows bundling of links across different modules of a modular chassis (and network modules in case of fixed chassis), for enhanced resilience.  `,
        },
      ],
    },
    {
      id: 5,
      title: "Add Layer 3 path diversity and load distribution",
      fullDesc: {
        p2p: {
          text: `Use ECMP as the primary method to load balance traffic across multiple independent point-to-point (P2P) Layer 3 links. This approach provides redundancy by distributing traffic over distinct physical paths, relying on routing protocols to dynamically divert traffic if a link fails.`,
          image: step5p,
        },
        ether: {
          text: `Use ECMP to load balance traffic across multiple EtherChannels, each acting as a single logical link to different next-hop devices. This enables redundancy and load sharing across aggregated links, improving network resilience by combining bandwidth and providing seamless failover without topology changes.`,
          image: step5r,
        },
      },
      type: "info",
    },
    {
      id: 6,
      title: "Enhance failure detection",
      fullDesc: {
        p2p: {
          text: `In redundant Layer 3 point-to-point network configurations, BFD is implemented directly on each individual interface. This ensures rapid failure detection, enabling swift rerouting of traffic to maintain network continuity.`,
          image: ste6p,
        },
        ether: {
          text: `For redundant Layer 3 EtherChannel deployments, BFD is configured on the logical port-channel interface. This approach allows for accelerated failure detection across the bundled links, contributing to high availability and seamless traffic flow.  `,
          image: ste6r,
        },
      },
      type: "info",
    },
    {
      id: 7,
      title: "Enable seamless gateway failover ",
      fullDesc: {
        p2p: {
          text: `HSRP or VRRP provide gateway redundancy and rapid failover between redundant supervisors or distinct switches within a Layer 3 domain. Operating over the VLAN's SVI, these protocols enable each redundant device to connect to the shared Layer 2 segment via its own point-to-point link.
Gateway redundancy is essential when ECMP is utilized.  `,
          image: ste7p,
        },
        ether: {
          text: `HSRP or VRRP provide gateway redundancy and rapid failover between redundant supervisors or distinct switches within a Layer 3 domain. Operating over the VLAN's SVI, these protocols enable each redundant device to connect to the shared Layer 2 segment via its own EtherChannel bundle; while EtherChannel manages internal link failures, HSRP/VRRP ensures failover for complete bundle or device failures. 
Gateway redundancy is essential when ECMP is utilized. `,
          image: ste7r,
        },
      },
      type: "info",
    },
    {
      id: 8,
      title: "Prepare for upgrade and maintenance",
      fullDesc: {
        p2p: {
          text: `Use GIR to facilitate traffic-safe upgrade and maintenance within redundant, ECMP-based networks.

When applied to point-to-point Layer 3 interfaces, GIR manipulates their metrics to effectively divert traffic to alternative ECMP paths.`,
          image: ste8p,
        },
        ether: {
          text: `Use GIR to facilitate traffic-safe upgrade and maintenance within redundant, ECMP-based networks. 

When applied to logical EtherChannel interfaces, GIR manipulates their metrics to effectively divert traffic to alternative ECMP paths. `,
          image: ste8r,
        },
      },
      type: "info",
    },
    {
      id: 9,
      title: "Follow maintenance best practices",
      fullDesc: `Schedule upgrades during off-peak hours Upgrade standby, then switchover, then upgrade new standby. 
Ensure software compatibility. 
Rollback standby if pre-switchover issues. Post-switchover rollback impacts traffic. 
Continuous monitoring for early detection and rollback.`,
      type: "info",
    },
  ],

  /* ----------------------------------
       STACKED FLOW
  ---------------------------------- */
  stacked: [
    {
      id: 2,
      title: "Stack your chassis according to its type",
      options: [
        {
          name: "Fixed chassis",
          image: stack1,

          fullDesc: `Stack fixed chassis with StackWise 
Stack up to eight C9350 chassis with StackWise cables. Use member priority value,  persistent MAC address etc as required. `,
        },
        {
          name: "Modular",
          image: stack1,

          fullDesc: `Stack modular chassis virtually with StackWise Virtual
Logically merge two physical chassis into a single control plane and forwarding entity. Use standard Ethernet cabling on front panel ports with Cisco transceivers. `,
        },
      ],
      type: "linkChoice",
    },
    {
      id: 3,
      title:
        "Synchronization between active and standby, built-in control plane redundancy",
      fullDesc: `For a StackWise fixed chassis and a StackWise Virtual modular chassis Cisco IOS XE provides built-in control plane redundancy. On detecting compatible, connected units, it automatically establishes active and standby roles for primary and secondary components, initiating stateful control plane synchronization.

This built-in SSO ensures comprehensive synchronization of all interface, protocol (L2/L3, unicast/multicast/VRF), and configuration states with the standby unit. This significantly minimizes traffic impact during a switchover event, maintaining continuous network operation.   Upon detecting compatible, connected units, it automatically establishes active and standby roles for primary and secondary components, initiating stateful control plane synchronization.`,
      image: stack2,
      type: "info",
    },
    {
      id: 4,
      title: "Extend SSO benefits to the network's neighbors",
      fullDesc: `Use NSF, to enable neighbor devices to maintain their forwarding information and keep the link active without triggering topology recalculations during a control-plane switchover.`,
      image: stack3,
      type: "info",
    },
    {
      id: 5,
      title: "Select the link aggregation or protocol approach",
      subtitle:
        "Determine the optimal link aggregation strategy for your stacked setup, choosing from these available options for redundancy and load balancing:",
      type: "linkChoice",
      selectedOption: "",
      options: [
        {
          name: "Multi-chassis EtherChannel (MEC) (Recommended)",
          image: stack4,
          desc: "Simple P2P for stack links.",
          fullDesc: `When selecting the link aggregation or protocol approach for a stacked setup, MEC is the recommended method. 

MEC bundles physical ports across multiple stack members, utilizing protocols like PAGP or LACP for auto-formation, and inherently benefits from NSF/SSO for superior redundancy and simplified topology.`,
        },
        {
          name: "EtherChannel (Supported, but sub-optimal)",

          desc: "Multi-link aggregation.",
          fullDesc: `If the EtherChannel radio button is selected— 
When selecting the link aggregation or protocol approach for a stacked setup, a standard EtherChannel is a supported method. This bundles physical ports to a single stack member. 

While it benefits from NSF/SSO, it is considered sub-optimal as it does not fully leverage the comprehensive redundancy capabilities across stack members. 
`,
        },
        {
          name: "P2P (Supported, but sub-optimal)",

          desc: "Multi-link aggregation.",
          fullDesc: `If the P2P radio button is selected—
When selecting the link aggregation or protocol approach for a stacked setup, point-to-point (P2P) Layer 3 interfaces, often combined with ECMP, are a supported method. 

While benefiting from NSF/SSO, this approach is considered sub-optimal as it does not fully leverage the comprehensive redundancy capabilities across stack members.`,
        },
      ],
    },
    {
      id: 6,
      title: "Enhance failure detection",
      fullDesc: `

BFD is employed for rapid Layer 3 link failure detection. Its necessity depends on the chosen link aggregation method.

Recommended for P2P or Standard EtherChannel with ECMP: If utilizing point-to-point Layer 3 links or a standard EtherChannel in conjunction with ECMP, BFD is recommended. It provides sub-second detection of link failures, enabling quicker traffic rerouting and maintaining high availability across these paths. This applies whether these links originate from a StackWise fixed chassis or a StackWise Virtual modular chassis.

Not Required with MEC: BFD is not required when using MEC. Because MEC inherently offers fast convergence and redundancy across stack members, making explicit BFD configuration on the logical interface redundant for link failure detection. This applies to both StackWise fixed chassis and StackWise Virtual modular chassis.`,
      type: "info",
    },
    {
      id: 7,
      title: "Seamless gateway failover by design",
      fullDesc: `A stacked MEC  inherently provides seamless gateway failover. 
By creating a single logical uplink and gateway IP, MEC eliminates the need for FHRPs, simplifying configuration and enhancing convergence across both fixed (StackWise) and modular (StackWise Virtual) chassis.  `,
      type: "info",
    },
    {
      id: 8,
      title: "Follow maintenance best practices",
      fullDesc: `For stacked environments (both StackWise fixed chassis and StackWise Virtual modular chassis), adhere to a structured maintenance approach:

Schedule upgrades during off-peak hours. Begin by upgrading the standby unit, then perform a controlled switchover to make the upgraded unit active. Subsequently, upgrade the newly designated standby. Always ensure software compatibility and continuously monitor for issues. If problems arise pre-switchover, roll back the standby. Be aware that any rollback post-switchover will impact traffic.  `,
      type: "info",
    },
  ],
};
